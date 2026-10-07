import { EmployeeHasReporteesError, DuplicateEmployeeError, EmployeeNotFoundError, HierarchyError, ValidationError } from '../src/errors';
import { Organization } from '../src/organization';
import { Designation } from '../src/types';

describe('Organization Management System', () => {
  function createOrganization(): Organization {
    const organization = new Organization();
    organization.addEmployee({ id: 'C001', name: 'CEO', dateOfBirth: '01/01/1970', designation: Designation.CEO });
    organization.addEmployee({ id: 'D001', name: 'Director', dateOfBirth: '01/01/1975', designation: Designation.Director, reportsTo: 'C001' });
    organization.addEmployee({ id: 'M001', name: 'Manager', dateOfBirth: '01/01/1980', designation: Designation.Manager, reportsTo: 'D001' });
    organization.addEmployee({ id: 'L001', name: 'Lead', dateOfBirth: '01/01/1985', designation: Designation.Lead, reportsTo: 'M001' });
    organization.addEmployee({ id: 'E001', name: 'Engineer', dateOfBirth: '01/01/1990', designation: Designation.Engineer, reportsTo: 'L001' });
    return organization;
  }

  test('creates the complete reporting hierarchy and maintains both sides', () => {
    const organization = createOrganization();
    expect(organization.getEmployeeData('E001').reportsTo).toBe('L001');
    expect(organization.getEmployeeData('L001').reportees).toEqual(['E001']);
    expect(organization.getEmployeeData('C001').reportees).toEqual(['D001']);
  });

  test('rejects duplicate IDs', () => {
    const organization = createOrganization();
    expect(() => organization.addEmployee({ id: 'E001', name: 'Other', dateOfBirth: '01/01/1991', designation: Designation.Engineer, reportsTo: 'L001' })).toThrow(DuplicateEmployeeError);
  });

  test('allows only one CEO', () => {
    const organization = createOrganization();
    expect(() => organization.addEmployee({ id: 'C002', name: 'Other CEO', dateOfBirth: '01/01/1971', designation: Designation.CEO })).toThrow(HierarchyError);
  });

  test('enforces designation hierarchy', () => {
    const organization = createOrganization();
    expect(() => organization.addEmployee({ id: 'E002', name: 'Engineer 2', dateOfBirth: '01/01/1991', designation: Designation.Engineer, reportsTo: 'M001' })).toThrow(HierarchyError);
  });

  test('rejects non-existent report manager', () => {
    const organization = createOrganization();
    expect(() => organization.addEmployee({ id: 'E002', name: 'Engineer 2', dateOfBirth: '01/01/1991', designation: Designation.Engineer, reportsTo: 'L999' })).toThrow(EmployeeNotFoundError);
  });

  test('validates date format and real calendar dates', () => {
    const organization = new Organization();
    expect(() => organization.addEmployee({ id: 'C001', name: 'CEO', dateOfBirth: '02/31/1970', designation: Designation.CEO })).toThrow(ValidationError);
  });

  test('updates basic employee details', () => {
    const organization = createOrganization();
    const updated = organization.updateEmployee('E001', { name: 'Updated Engineer', dateOfBirth: '02/02/1990' });
    expect(updated.name).toBe('Updated Engineer');
    expect(updated.dateOfBirth).toBe('02/02/1990');
  });

  test('rejects update of missing employee', () => {
    const organization = createOrganization();
    expect(() => organization.updateEmployee('E999', { name: 'Unknown' })).toThrow(EmployeeNotFoundError);
  });

  test('changing manager updates both sides', () => {
    const organization = createOrganization();
    organization.addEmployee({ id: 'M002', name: 'Manager 2', dateOfBirth: '01/01/1981', designation: Designation.Manager, reportsTo: 'D001' });
    organization.addEmployee({ id: 'L002', name: 'Lead 2', dateOfBirth: '01/01/1986', designation: Designation.Lead, reportsTo: 'M002' });
    organization.updateEmployee('E001', { reportsTo: 'L002' });

    expect(organization.getEmployeeData('E001').reportsTo).toBe('L002');
    expect(organization.getEmployeeData('L001').reportees).toEqual([]);
    expect(organization.getEmployeeData('L002').reportees).toEqual(['E001']);
  });

  test('rejects deleting an employee with reportees', () => {
    const organization = createOrganization();
    expect(() => organization.deleteEmployee('L001')).toThrow(EmployeeHasReporteesError);
  });

  test('deleting a leaf employee removes it from its manager', () => {
    const organization = createOrganization();
    organization.deleteEmployee('E001');
    expect(() => organization.getEmployeeData('E001')).toThrow(EmployeeNotFoundError);
    expect(organization.getEmployeeData('L001').reportees).toEqual([]);
  });

  test('rejects changing designation because it can violate hierarchy invariants', () => {
    const organization = createOrganization();
    expect(() => organization.updateEmployee('E001', { designation: Designation.Lead })).toThrow(ValidationError);
  });
});
