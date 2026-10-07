export enum Designation {
  Engineer = 'Engineer',
  Lead = 'Lead',
  Manager = 'Manager',
  Director = 'Director',
  CEO = 'CEO'
}

export type EmployeeId = string;

export interface EmployeeData {
  readonly name: string;
  readonly id: EmployeeId;
  readonly dateOfBirth: string;
  readonly designation: Designation;
  readonly reportsTo: EmployeeId | null;
  readonly reportees: readonly EmployeeId[];
}

export interface CreateEmployeeInput {
  name: string;
  id: EmployeeId;
  dateOfBirth: string;
  designation: Designation;
  reportsTo?: EmployeeId | null;
}

export interface UpdateEmployeeInput {
  name?: string;
  dateOfBirth?: string;
  designation?: Designation;
  reportsTo?: EmployeeId | null;
}
