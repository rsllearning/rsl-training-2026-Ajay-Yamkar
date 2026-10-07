# Organization Management System — TypeScript

A console-based Organization Management System implemented using TypeScript and object-oriented programming concepts.

## Assignment coverage

The implementation supports:

- Employees: Engineer, Lead, Manager, Director and CEO.
- Common fields: name, unique ID, date of birth and designation.
- Role-specific reporting hierarchy:
  - Engineer → Lead
  - Lead → Manager
  - Manager → Director
  - Director → CEO
  - CEO → nobody
- CRUD operations:
  - Create employee
  - Retrieve one employee
  - Retrieve all employees
  - Update employee
  - Delete employee
- Validation and edge cases:
  - Duplicate employee IDs rejected.
  - Only one CEO allowed.
  - Reporting relationship must follow the required hierarchy.
  - `reportsTo` must reference an existing employee.
  - CEO cannot report to another employee.
  - Self-reporting and cycles are rejected.
  - Required fields and MM/DD/YYYY dates are validated.
  - Real calendar dates are validated (for example, 02/31/1990 is rejected).
  - Updating a non-existent employee is rejected.
  - Employees with reportees cannot be deleted.
  - Bidirectional reporting state is kept consistent when a manager changes or an employee is deleted.

## Design approach

### OOP concepts used

1. **Abstraction** — `Employee` is an abstract base class containing common employee behavior.
2. **Inheritance** — `Engineer`, `Lead`, `Manager`, `Director`, and `CEO` extend `Employee`.
3. **Encapsulation** — Employee state is private and modified through controlled methods.
4. **Polymorphism** — `Employee` references can represent any concrete employee subtype.
5. **Factory pattern** — `EmployeeFactory` creates the correct employee subtype from the designation.
6. **Single aggregate owner for relationships** — `Organization` owns the employee collection and is responsible for maintaining both sides of the reporting relationship.

### Relationship consistency

The assignment describes a bidirectional relationship: an employee has `reportsTo`, while the manager has a list of `reportees`.

To prevent inconsistent state, callers do not directly manipulate the relationship from outside `Organization`. `Organization.addEmployee`, `Organization.updateEmployee`, and `Organization.deleteEmployee` update both sides together.

### Update assumption

Basic employee details can be updated freely. Changing designation is intentionally rejected because designation changes can invalidate the employee's existing reportees and reporting manager. A safe approach for a real production system would provide an explicit promotion/reorganization workflow that validates and migrates the affected subtree.

### Delete assumption

Deletion is rejected when an employee has reportees. This avoids silently orphaning employees. A future extension could support reassignment as an explicit operation.

## Project structure

```text
organization-management/
├── src/
│   ├── employee.ts
│   ├── employee-factory.ts
│   ├── errors.ts
│   ├── index.ts
│   ├── organization.ts
│   ├── types.ts
│   └── validator.ts
├── tests/
│   └── organization.test.ts
├── .gitignore
├── jest.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Prerequisites

- Node.js 18+ recommended
- npm

## Installation

```bash
npm install
```

## Type-check

```bash
npm run typecheck
```

## Build

```bash
npm run build
```

## Run

```bash
npm start
```

`npm start` automatically builds the TypeScript source into `dist/` before starting the application, so a separate `npm run build` is not required.

For development without a build step:

```bash
npm run dev
```

## Run tests

```bash
npm test
```