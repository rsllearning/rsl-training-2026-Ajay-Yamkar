import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submitApplication, type SubmissionResult } from './api/submitApplication'
import { applicationSchema, defaultValues, stepFields, type ApplicationValues } from './schema/application'
import { ApplicationStep, EducationStep, ExperienceStep, PersonalStep, ReviewStep } from './components/Steps'

const steps = ['Personal', 'Education', 'Experience', 'Application', 'Review']
const stepComponents = [PersonalStep, EducationStep, ExperienceStep, ApplicationStep, ReviewStep]

export default function App() {
  const [step, setStep] = useState(0)
  const [serverResult, setServerResult] = useState<SubmissionResult | null>(null)
  const [submitError, setSubmitError] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)
  const methods = useForm<ApplicationValues>({ resolver: zodResolver(applicationSchema), defaultValues, mode: 'onBlur', reValidateMode: 'onChange', shouldUnregister: false, shouldFocusError: true })
  const { handleSubmit, trigger, setError, clearErrors, formState: { isSubmitting } } = methods
  const CurrentStep = stepComponents[step]

  async function next() {
    clearErrors('root')
    const valid = await trigger(stepFields[step], { shouldFocus: true })
    if (valid) setStep(current => Math.min(current + 1, steps.length - 1))
  }
  function back() { clearErrors('root'); setStep(current => Math.max(current - 1, 0)) }
  async function onSubmit(values: ApplicationValues) {
    setServerResult(null)
    setSubmitError('')
    const result = await submitApplication(values)
    setServerResult(result)
    if (result.kind === 'validation') {
      setError(result.field, { type: 'server', message: result.message })
      setStep(0)
      requestAnimationFrame(() => methods.setFocus(result.field))
    } else if (result.kind === 'error') {
      setSubmitError(result.message)
      requestAnimationFrame(() => resultRef.current?.focus())
    } else {
      requestAnimationFrame(() => resultRef.current?.focus())
    }
  }

  return <div className="app-shell"><header className="site-header"><a className="brand" href="#home" aria-label="Northstar careers home"><span className="brand-mark">N</span><span>northstar<span className="brand-light"> careers</span></span></a><span className="header-note">Careers <span aria-hidden="true">/</span> Application</span><a className="help-link" href="mailto:careers@example.com">Need help?</a></header>
    <main className="layout"><aside className="intro-panel"><div className="orb orb-one" /><div className="orb orb-two" /><p className="eyebrow light">BUILD WHAT’S NEXT</p><h1>Your next chapter<br />starts here.</h1><p className="hero-copy">Bring your perspective, your ambition, and your ideas. We’ll bring the room to grow.</p><div className="quote-card"><span className="quote-mark">“</span><p>Great work happens when good people get the space to do it.</p><div className="quote-person"><span className="avatar">N</span><span><strong>Northstar People team</strong><small>Here to help you thrive</small></span></div></div><div className="aside-footer"><span>✳</span> Thoughtful work. Real impact.</div></aside>
      <div className="form-column"><div className="form-topline"><span>JOB APPLICATION</span><span>Usually takes 5–7 minutes</span></div><div className="progress-track" aria-label={`Step ${step + 1} of ${steps.length}`}><div className="progress-fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div><nav className="step-nav" aria-label="Application steps">{steps.map((label, index) => <div className={`step-indicator ${index === step ? 'current' : ''} ${index < step ? 'complete' : ''}`} key={label} aria-current={index === step ? 'step' : undefined}><span className="step-number">{index < step ? '✓' : `0${index + 1}`}</span><span className="step-label">{label}</span></div>)}</nav>
        <FormProvider {...methods}><form noValidate onSubmit={handleSubmit(onSubmit)}><CurrentStep />{submitError && <div ref={resultRef} tabIndex={-1} className="notice error-notice" role="alert"><span aria-hidden="true">!</span><div><strong>Something went wrong</strong><p>{submitError}</p><button type="button" className="text-button" onClick={() => { setSubmitError(''); setServerResult(null) }}>Try again</button></div></div>}{serverResult?.kind === 'success' && <div ref={resultRef} tabIndex={-1} className="notice success-notice" role="status"><span aria-hidden="true">✓</span><div><strong>Application received</strong><p>Your reference number is <b>{serverResult.reference}</b>. Thanks for applying.</p></div></div>}{serverResult?.kind === 'validation' && <div ref={resultRef} tabIndex={-1} className="notice error-notice" role="alert"><span aria-hidden="true">!</span><div><strong>There’s an issue with your application</strong><p>{serverResult.message} We’ve taken you back to the relevant field.</p></div></div>}
          <footer className="form-actions"><div className="privacy-note"><span aria-hidden="true">♢</span> Your information stays private and secure.</div><div className="button-row">{step > 0 && <button type="button" className="back-button" onClick={back} disabled={isSubmitting}><span aria-hidden="true">←</span> Back</button>}{step < steps.length - 1 ? <button type="button" className="next-button" onClick={next}>Continue <span aria-hidden="true">→</span></button> : <button type="submit" className="next-button" disabled={isSubmitting}>{isSubmitting ? <><span className="spinner" /> Sending…</> : <>Submit application <span aria-hidden="true">→</span></>}</button>}</div></footer></form></FormProvider><div className="copyright">© 2026 Northstar. Equal opportunity employer.</div></div>
    </main></div>
}
