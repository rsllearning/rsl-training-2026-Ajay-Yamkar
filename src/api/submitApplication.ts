import type { ApplicationValues } from '../schema/application'

export type SubmissionResult = { kind: 'success'; reference: string } | { kind: 'validation'; field: 'email'; message: string } | { kind: 'error'; message: string }
let attempt = 0

export async function submitApplication(_values: ApplicationValues): Promise<SubmissionResult> {
  await new Promise(resolve => window.setTimeout(resolve, 1500))
  attempt += 1
  // Rotate outcomes so all three server paths can be reviewed during a demo.
  if (attempt % 3 === 1) return { kind: 'validation', field: 'email', message: 'This email is already associated with an application.' }
  if (attempt % 3 === 2) return { kind: 'error', message: 'We could not reach the application service. Please try again.' }
  return { kind: 'success', reference: `NS-${Date.now().toString().slice(-7)}` }
}
