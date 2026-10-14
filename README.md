# React Todo List Assignment

A React + Vite implementation of the Todo List assignment.

## Requirements
- Node.js 18 or later
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Features
- Add todo descriptions (including empty descriptions, as no validation is required).
- Edit pending tasks with Confirm and Cancel.
- Mark pending tasks completed; completed tasks cannot be unchecked or edited.
- Delete is enabled only for completed tasks and asks for confirmation.
- All / Done / Todo filters.
- Completed tasks appear before pending tasks in All.
- Empty-state message when the current filter has no matching tasks.
- Responsive layout inspired by the supplied prototype.