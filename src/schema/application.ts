import { z } from 'zod'

const requiredText = (label: string, min = 1) => z.string().trim().min(min, `${label} is required.`)
const pastDate = z.string().min(1, 'Date is required.').refine(value => !Number.isNaN(Date.parse(value)) && value <= new Date().toISOString().slice(0, 10), 'Date must be today or earlier.')
const educationSchema = z.object({ degree: requiredText('Degree'), institution: requiredText('Institution'), year: z.string().regex(/^\d{4}$/, 'Enter a four digit year.').refine(value => Number(value) <= new Date().getFullYear(), 'Year cannot be in the future.'), percentage: z.number().min(0, 'Use a value from 0 to 100.').max(100, 'Use a value from 0 to 100.') })
const companySchema = z.object({ name: requiredText('Company'), role: requiredText('Role'), from: requiredText('Start date'), to: requiredText('End date') }).refine(row => row.from <= row.to, { path: ['to'], message: 'End date must be after the start date.' })

export const applicationSchema = z.object({
  fullName: requiredText('Full name', 2), email: z.string().trim().email('Enter a valid email address.'), phone: z.string().trim().regex(/^\+?[\d\s().-]{7,20}$/, 'Enter a valid phone number.'), dateOfBirth: pastDate.refine(value => { const d = new Date(value); const now = new Date(); let age = now.getFullYear() - d.getFullYear(); if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) age--; return age >= 18 }, 'You must be at least 18 years old.'), city: requiredText('Current city'),
  education: z.array(educationSchema).min(1, 'Add at least one qualification.'),
  experienceType: z.enum(['fresher', 'experienced']), availability: z.string().optional(), totalExperience: z.string().optional(), noticePeriod: z.string().optional(), companies: z.array(companySchema).optional(),
  position: requiredText('Position'), joiningDate: z.string().min(1, 'Expected joining date is required.').refine(value => value > new Date().toISOString().slice(0, 10), 'Joining date must be in the future.'), portfolio: z.union([z.literal(''), z.string().url('Enter a valid URL.')]).optional(), coverNote: z.string().max(1000, 'Keep your cover note under 1000 characters.').optional(), acceptsTerms: z.boolean().refine(value => value, 'You must accept the terms to continue.')
}).superRefine((data, ctx) => {
  if (data.experienceType === 'fresher' && !data.availability?.trim()) ctx.addIssue({ code: 'custom', path: ['availability'], message: 'Tell us when you are available to join.' })
  if (data.experienceType === 'experienced') {
    if (!data.totalExperience?.trim()) ctx.addIssue({ code: 'custom', path: ['totalExperience'], message: 'Enter your total experience.' })
    if (!data.noticePeriod?.trim()) ctx.addIssue({ code: 'custom', path: ['noticePeriod'], message: 'Select your notice period.' })
    if (!data.companies?.length) ctx.addIssue({ code: 'custom', path: ['companies'], message: 'Add at least one previous company.' })
  }
})

export type ApplicationValues = z.infer<typeof applicationSchema>
export const defaultValues: ApplicationValues = { fullName: '', email: '', phone: '', dateOfBirth: '', city: '', education: [{ degree: '', institution: '', year: '', percentage: 0 }], experienceType: 'fresher', availability: '', totalExperience: '', noticePeriod: '', companies: [{ name: '', role: '', from: '', to: '' }], position: '', joiningDate: '', portfolio: '', coverNote: '', acceptsTerms: false }

export const stepFields: Record<number, (keyof ApplicationValues)[]> = {
  0: ['fullName', 'email', 'phone', 'dateOfBirth', 'city'],
  1: ['education'],
  2: ['experienceType', 'availability', 'totalExperience', 'noticePeriod', 'companies'],
  3: ['position', 'joiningDate', 'portfolio', 'coverNote', 'acceptsTerms']
}
