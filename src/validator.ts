import { ValidationError } from './errors';
import { CreateEmployeeInput, Designation, UpdateEmployeeInput } from './types';

const DOB_REGEX = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

export class EmployeeValidator {
  public static validateCreate(input: CreateEmployeeInput): void {
    this.validateCommon(input.name, input.id, input.dateOfBirth);

    if (!Object.values(Designation).includes(input.designation)) {
      throw new ValidationError(`Invalid designation '${String(input.designation)}'.`);
    }

    if (input.designation === Designation.CEO) {
      if (input.reportsTo !== undefined && input.reportsTo !== null) {
        throw new ValidationError('CEO must not report to another employee.');
      }
      return;
    }

    if (input.reportsTo === undefined || input.reportsTo === null || input.reportsTo.trim() === '') {
      throw new ValidationError(`${input.designation} must have a reportsTo employee ID.`);
    }
  }

  public static validateUpdate(input: UpdateEmployeeInput): void {
    if (input.name !== undefined && input.name.trim() === '') {
      throw new ValidationError('Employee name cannot be empty.');
    }
    if (input.dateOfBirth !== undefined) {
      this.validateDateOfBirth(input.dateOfBirth);
    }
    if (input.designation !== undefined && !Object.values(Designation).includes(input.designation)) {
      throw new ValidationError(`Invalid designation '${String(input.designation)}'.`);
    }
    if (input.reportsTo !== undefined && input.reportsTo !== null && input.reportsTo.trim() === '') {
      throw new ValidationError('reportsTo cannot be empty.');
    }
  }

  private static validateCommon(name: string, id: string, dateOfBirth: string): void {
    if (name.trim() === '') {
      throw new ValidationError('Employee name is required.');
    }
    if (id.trim() === '') {
      throw new ValidationError('Employee ID is required.');
    }
    this.validateDateOfBirth(dateOfBirth);
  }

  private static validateDateOfBirth(dateOfBirth: string): void {
    if (!DOB_REGEX.test(dateOfBirth)) {
      throw new ValidationError(`Invalid dateOfBirth '${dateOfBirth}'. Expected MM/DD/YYYY.`);
    }

    const [monthText, dayText, yearText] = dateOfBirth.split('/');
    const month = Number(monthText);
    const day = Number(dayText);
    const year = Number(yearText);
    const date = new Date(year, month - 1, day);

    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      throw new ValidationError(`Invalid calendar date '${dateOfBirth}'.`);
    }
  }
}
