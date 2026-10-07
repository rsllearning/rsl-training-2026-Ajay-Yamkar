import { Organization } from './organization';
import { Designation } from './types';
import { OrganizationError } from './errors';

function main(): void {
  const organization = new Organization();

  const attempt = (description: string, operation: () => void): void => {
    try {
      operation();
      console.log(`✓ ${description}`);
    } catch (error: unknown) {
      if (error instanceof OrganizationError) {
        console.log(`✗ ${description} -> ${error.message}`);
      } else {
        throw error;
      }
    }
  };

  console.log('\n=== ORGANIZATION MANAGEMENT SYSTEM ===\n');

  attempt('Add CEO C001', () => {
    organization.addEmployee({
      id: 'C001', name: 'Rohan Mehta', dateOfBirth: '01/15/1975', designation: Designation.CEO
    });
  });

  attempt('Add Director D001 reporting to C001', () => {
    organization.addEmployee({
      id: 'D001', name: 'Neha Shah', dateOfBirth: '03/20/1980', designation: Designation.Director, reportsTo: 'C001'
    });
  });

  attempt('Add Manager M001 reporting to D001', () => {
    organization.addEmployee({
      id: 'M001', name: 'Amit Kulkarni', dateOfBirth: '07/11/1985', designation: Designation.Manager, reportsTo: 'D001'
    });
  });

  attempt('Add Lead L001 reporting to M001', () => {
    organization.addEmployee({
      id: 'L001', name: 'Priya Joshi', dateOfBirth: '09/02/1989', designation: Designation.Lead, reportsTo: 'M001'
    });
  });

  attempt('Add Engineer E001 reporting to L001', () => {
    organization.addEmployee({
      id: 'E001', name: 'Anita Sharma', dateOfBirth: '05/12/1995', designation: Designation.Engineer, reportsTo: 'L001'
    });
  });

  attempt('Reject duplicate employee ID E001', () => {
    organization.addEmployee({
      id: 'E001', name: 'Duplicate User', dateOfBirth: '05/12/1996', designation: Designation.Engineer, reportsTo: 'L001'
    });
  });

  attempt('Reject second CEO C002', () => {
    organization.addEmployee({
      id: 'C002', name: 'Second CEO', dateOfBirth: '10/10/1978', designation: Designation.CEO
    });
  });

  attempt('Reject invalid hierarchy: Engineer reporting to Manager', () => {
    organization.addEmployee({
      id: 'E002', name: 'Invalid Engineer', dateOfBirth: '06/10/1996', designation: Designation.Engineer, reportsTo: 'M001'
    });
  });

  attempt('Reject invalid date', () => {
    organization.addEmployee({
      id: 'E003', name: 'Invalid Date', dateOfBirth: '02/31/1996', designation: Designation.Engineer, reportsTo: 'L001'
    });
  });

  console.log('\n=== GET ALL EMPLOYEES ===');
  console.table(organization.getAllEmployees());

  console.log('\n=== GET ONE EMPLOYEE ===');
  console.log(organization.getEmployeeData('E001'));

  attempt('Update E001 name', () => {
    organization.updateEmployee('E001', { name: 'Anita Patil' });
    console.log(organization.getEmployeeData('E001'));
  });

  attempt('Reject update for non-existent employee', () => {
    organization.updateEmployee('E999', { name: 'Unknown' });
  });

  attempt('Reject deleting L001 because it has reportees', () => {
    organization.deleteEmployee('L001');
  });

  attempt('Delete E001', () => {
    organization.deleteEmployee('E001');
  });

  console.log('\n=== FINAL ORGANIZATION ===');
  console.table(organization.getAllEmployees());

  console.log('\nDemo complete.');
}

// Keep a small exported entry point for tests/tooling while running the demo only when executed directly.
export { main };

main();
