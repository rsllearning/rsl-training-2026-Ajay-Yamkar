# Northstar job application

A five step, accessible application wizard built with React, TypeScript, React Hook Form, and Zod.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Run `npm run build` to type check and create a production build, then `npm run preview` to serve it locally.

## Structure and validation

- `src/schema/application.ts` contains the Zod schemas, defaults, and the inferred `ApplicationValues` type. It is the single source for validation and form types.
- `src/components/Fields.tsx` provides registered input, select, and textarea components. Each subscribes only to its own form state and renders its label and linked error.
- `src/components/Steps.tsx` holds the five wizard steps, repeated education and company rows, and read only review.
- `src/api/submitApplication.ts` is the mock API.

The form uses Zod's full schema with React Hook Form's default resolver behavior (`mode: onBlur`, revalidation on change). Step navigation calls `trigger` for only that step's fields. Zod handles formats and limits, the 18+ date of birth check, the company end-after-start rule, and the future joining date rule. `shouldUnregister: false` keeps values when steps and conditional experience fields unmount. Values stay in the one React Hook Form instance shared through `FormProvider`.

Narrow `useWatch` subscriptions drive the experience branch and read-only review. Individual reusable fields use `useFormState` for their own error state. Repeating sections use `useFieldArray` and its stable `field.id` keys. Step components are selected from a module-level array, so changing a step does not create a new component type.

The mock API waits 1.5 seconds and rotates through three outcomes in order: field-level server validation (sets an email error and returns to that field), a server failure (shows a retryable alert), and success (shows a reference number). Repeat submissions cycle through these cases.

## Incomplete deliverables

The assignment asks for a GitHub pull request and screenshots or a short screen recording. Those require access to the user's GitHub account and a browser capture; this repository contains the implementation and local run instructions, but no PR link, branch upload, or screenshots.
