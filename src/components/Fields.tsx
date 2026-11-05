import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { useFormContext, useFormState } from 'react-hook-form'
import type { ApplicationValues } from '../schema/application'

function FieldShell({ name, label, hint, children }: { name: keyof ApplicationValues | string; label: string; hint?: string; children: (id: string, error?: string) => ReactNode }) {
  const id = useId()
  const { control } = useFormContext<ApplicationValues>()
  const { errors } = useFormState({ control, name: name as never })
  const error = name.split('.').reduce<unknown>((node, key) => node && typeof node === 'object' ? (node as Record<string, unknown>)[key] : undefined, errors)
  const message = error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' ? error.message : undefined
  return <div className="field"><label htmlFor={id}>{label}</label>{hint && <small className="hint">{hint}</small>}{children(id, message)}{message && <span className="field-error" id={`${id}-error`} role="alert">{message}</span>}</div>
}

export function TextField({ name, label, hint, ...props }: { name: keyof ApplicationValues | string; label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const { register } = useFormContext<ApplicationValues>()
  return <FieldShell name={name} label={label} hint={hint}>{(id, error) => <input id={id} {...props} {...register(name as never, props.type === 'number' ? { valueAsNumber: true } : undefined)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />}</FieldShell>
}
export function TextAreaField({ name, label, hint, ...props }: { name: keyof ApplicationValues | string; label: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { register } = useFormContext<ApplicationValues>()
  return <FieldShell name={name} label={label} hint={hint}>{(id, error) => <textarea id={id} {...props} {...register(name as never)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} />}</FieldShell>
}
export function SelectField({ name, label, children, ...props }: { name: keyof ApplicationValues | string; label: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  const { register } = useFormContext<ApplicationValues>()
  return <FieldShell name={name} label={label}>{(id, error) => <select id={id} {...props} {...register(name as never)} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}>{children}</select>}</FieldShell>
}
