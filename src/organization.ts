import {
  DuplicateEmployeeError,
  EmployeeHasReporteesError,
  EmployeeNotFoundError,
  HierarchyError,
  ValidationError
} from './errors';
import { Employee } from './employee';
import { EmployeeFactory } from './employee-factory';
import { EmployeeValidator } from './validator';
import { CreateEmployeeInput, Designation, EmployeeData, EmployeeId, UpdateEmployeeInput } from './types';

/**
 * Aggregate root for the organization.
 * It owns relationship consistency so callers cannot accidentally update only one side
 * of the bidirectional reporting relationship.
 */
export class Organization {
  private readonly employees = new Map<EmployeeId, Employee>();

  public addEmployee(input: CreateEmployeeInput): EmployeeData {
    EmployeeValidator.validateCreate(input);

    if (this.employees.has(input.id)) {
      throw new DuplicateEmployeeError(input.id);
    }

    if (input.designation === Designation.CEO && this.findByDesignation(Designation.CEO) !== undefined) {
      throw new HierarchyError('Only one CEO is allowed in the organization.');
    }

    const reportsTo = input.reportsTo ?? null;
    this.validateReportingRelationship(input.designation, reportsTo);

    const employee = EmployeeFactory.create({ ...input, reportsTo });
    this.employees.set(employee.id, employee);

    if (reportsTo !== null) {
      const manager = this.getEmployee(reportsTo);
      manager.addReportee(employee.id);
    }

    return employee.toData();
  }

  public updateEmployee(id: EmployeeId, input: UpdateEmployeeInput): EmployeeData {
    this.requireEmployee(id);
    EmployeeValidator.validateUpdate(input);

    const employee = this.getEmployee(id);

    if (input.designation !== undefined && input.designation !== employee.designation) {
      throw new ValidationError(
        'Changing designation is intentionally restricted in this implementation. Delete and recreate the employee after resolving their reportees.'
      );
    }

    const targetDesignation = employee.designation;
    const targetReportsTo = input.reportsTo !== undefined ? input.reportsTo : employee.reportsTo;

    if (targetDesignation === Designation.CEO && this.findByDesignation(Designation.CEO)?.id !== id) {
      throw new HierarchyError('Only one CEO is allowed in the organization.');
    }

    this.validateReportingRelationship(targetDesignation, targetReportsTo, id);

    if (input.name !== undefined || input.dateOfBirth !== undefined) {
      employee.updateBasicDetails(input.name, input.dateOfBirth);
    }

    if (input.reportsTo !== undefined && input.reportsTo !== employee.reportsTo) {
      this.changeReportingManager(employee, input.reportsTo ?? null);
    }

    return employee.toData();
  }

  public deleteEmployee(id: EmployeeId): void {
    const employee = this.requireEmployee(id);

    if (employee.reportees.length > 0) {
      throw new EmployeeHasReporteesError(id);
    }

    if (employee.reportsTo !== null) {
      const manager = this.getEmployee(employee.reportsTo);
      manager.removeReportee(employee.id);
    }

    this.employees.delete(id);
  }

  public getEmployee(id: EmployeeId): Employee {
    const employee = this.employees.get(id);
    if (employee === undefined) {
      throw new EmployeeNotFoundError(id);
    }
    return employee;
  }

  public getEmployeeData(id: EmployeeId): EmployeeData {
    return this.getEmployee(id).toData();
  }

  public getAllEmployees(): EmployeeData[] {
    return [...this.employees.values()].map((employee) => employee.toData());
  }

  private requireEmployee(id: EmployeeId): Employee {
    return this.getEmployee(id);
  }

  private findByDesignation(designation: Designation): Employee | undefined {
    return [...this.employees.values()].find((employee) => employee.designation === designation);
  }

  private validateReportingRelationship(
    designation: Designation,
    reportsTo: EmployeeId | null,
    currentEmployeeId?: EmployeeId
  ): void {
    if (designation === Designation.CEO) {
      if (reportsTo !== null) {
        throw new HierarchyError('CEO must not report to anyone.');
      }
      return;
    }

    if (reportsTo === null) {
      throw new HierarchyError(`${designation} must report to an employee.`);
    }

    if (currentEmployeeId !== undefined && reportsTo === currentEmployeeId) {
      throw new HierarchyError('An employee cannot report to themselves.');
    }

    const manager = this.employees.get(reportsTo);
    if (manager === undefined) {
      throw new EmployeeNotFoundError(reportsTo);
    }

    const expectedManagerDesignation = this.expectedManagerDesignation(designation);
    if (manager.designation !== expectedManagerDesignation) {
      throw new HierarchyError(
        `${designation} must report to a ${expectedManagerDesignation}; employee '${reportsTo}' is a ${manager.designation}.`
      );
    }

    if (currentEmployeeId !== undefined && this.wouldCreateCycle(currentEmployeeId, reportsTo)) {
      throw new HierarchyError('The reporting change would create a cycle in the organization.');
    }
  }

  private expectedManagerDesignation(designation: Designation): Designation {
    switch (designation) {
      case Designation.Engineer:
        return Designation.Lead;
      case Designation.Lead:
        return Designation.Manager;
      case Designation.Manager:
        return Designation.Director;
      case Designation.Director:
        return Designation.CEO;
      case Designation.CEO:
        throw new HierarchyError('CEO does not have a manager.');
      default:
        throw new ValidationError(`Unsupported designation: ${String(designation)}`);
    }
  }

  private wouldCreateCycle(employeeId: EmployeeId, proposedManagerId: EmployeeId): boolean {
    let currentId: EmployeeId | null = proposedManagerId;
    const visited = new Set<EmployeeId>();

    while (currentId !== null) {
      if (currentId === employeeId) {
        return true;
      }
      if (visited.has(currentId)) {
        return true;
      }
      visited.add(currentId);
      currentId = this.getEmployee(currentId).reportsTo;
    }

    return false;
  }

  private changeReportingManager(employee: Employee, newManagerId: EmployeeId | null): void {
    const oldManagerId = employee.reportsTo;

    if (oldManagerId !== null) {
      this.getEmployee(oldManagerId).removeReportee(employee.id);
    }

    employee.setReportsTo(newManagerId);

    if (newManagerId !== null) {
      this.getEmployee(newManagerId).addReportee(employee.id);
    }
  }
}
