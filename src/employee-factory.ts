import { CEO, Director, Employee, Engineer, Lead, Manager } from './employee';
import { ValidationError } from './errors';
import { CreateEmployeeInput, Designation } from './types';

export class EmployeeFactory {
  public static create(input: CreateEmployeeInput): Employee {
    switch (input.designation) {
      case Designation.Engineer:
        return new Engineer(input.id, input.name, input.dateOfBirth, input.reportsTo as string);
      case Designation.Lead:
        return new Lead(input.id, input.name, input.dateOfBirth, input.reportsTo as string);
      case Designation.Manager:
        return new Manager(input.id, input.name, input.dateOfBirth, input.reportsTo as string);
      case Designation.Director:
        return new Director(input.id, input.name, input.dateOfBirth, input.reportsTo as string);
      case Designation.CEO:
        return new CEO(input.id, input.name, input.dateOfBirth);
      default:
        throw new ValidationError(`Unsupported designation: ${String(input.designation)}`);
    }
  }
}
