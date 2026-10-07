import { Designation, EmployeeData, EmployeeId } from './types';

/** Base domain entity. The reporting relationship is maintained by Organization. */
export abstract class Employee {
  private readonly reporteeIds: Set<EmployeeId>;

  protected constructor(
    private readonly employeeId: EmployeeId,
    private employeeName: string,
    private employeeDateOfBirth: string,
    private readonly employeeDesignation: Designation,
    private employeeReportsTo: EmployeeId | null
  ) {
    this.reporteeIds = new Set<EmployeeId>();
  }

  public get id(): EmployeeId {
    return this.employeeId;
  }

  public get name(): string {
    return this.employeeName;
  }

  public get dateOfBirth(): string {
    return this.employeeDateOfBirth;
  }

  public get designation(): Designation {
    return this.employeeDesignation;
  }

  public get reportsTo(): EmployeeId | null {
    return this.employeeReportsTo;
  }

  public get reportees(): readonly EmployeeId[] {
    return [...this.reporteeIds];
  }

  public updateBasicDetails(name?: string, dateOfBirth?: string): void {
    if (name !== undefined) {
      this.employeeName = name;
    }
    if (dateOfBirth !== undefined) {
      this.employeeDateOfBirth = dateOfBirth;
    }
  }

  public setReportsTo(managerId: EmployeeId | null): void {
    this.employeeReportsTo = managerId;
  }

  public addReportee(employeeId: EmployeeId): void {
    this.reporteeIds.add(employeeId);
  }

  public removeReportee(employeeId: EmployeeId): void {
    this.reporteeIds.delete(employeeId);
  }

  public toData(): EmployeeData {
    return {
      name: this.name,
      id: this.id,
      dateOfBirth: this.dateOfBirth,
      designation: this.designation,
      reportsTo: this.reportsTo,
      reportees: this.reportees
    };
  }
}

export class Engineer extends Employee {
  public constructor(id: EmployeeId, name: string, dateOfBirth: string, reportsTo: EmployeeId) {
    super(id, name, dateOfBirth, Designation.Engineer, reportsTo);
  }
}

export class Lead extends Employee {
  public constructor(id: EmployeeId, name: string, dateOfBirth: string, reportsTo: EmployeeId) {
    super(id, name, dateOfBirth, Designation.Lead, reportsTo);
  }
}

export class Manager extends Employee {
  public constructor(id: EmployeeId, name: string, dateOfBirth: string, reportsTo: EmployeeId) {
    super(id, name, dateOfBirth, Designation.Manager, reportsTo);
  }
}

export class Director extends Employee {
  public constructor(id: EmployeeId, name: string, dateOfBirth: string, reportsTo: EmployeeId) {
    super(id, name, dateOfBirth, Designation.Director, reportsTo);
  }
}

export class CEO extends Employee {
  public constructor(id: EmployeeId, name: string, dateOfBirth: string) {
    super(id, name, dateOfBirth, Designation.CEO, null);
  }
}
