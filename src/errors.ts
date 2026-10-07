export class OrganizationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'OrganizationError';
  }
}

export class ValidationError extends OrganizationError {
  public constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class DuplicateEmployeeError extends OrganizationError {
  public constructor(id: string) {
    super(`Employee with ID '${id}' already exists.`);
    this.name = 'DuplicateEmployeeError';
  }
}

export class EmployeeNotFoundError extends OrganizationError {
  public constructor(id: string) {
    super(`Employee with ID '${id}' does not exist.`);
    this.name = 'EmployeeNotFoundError';
  }
}

export class HierarchyError extends OrganizationError {
  public constructor(message: string) {
    super(message);
    this.name = 'HierarchyError';
  }
}

export class EmployeeHasReporteesError extends OrganizationError {
  public constructor(id: string) {
    super(`Employee '${id}' cannot be deleted because they have reportees.`);
    this.name = 'EmployeeHasReporteesError';
  }
}
