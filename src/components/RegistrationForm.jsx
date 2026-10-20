import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button button-dark full-width" type="submit" disabled={pending}>
      {pending ? <><span className="spinner small-spinner" /> Creating your account…</> : 'Create account'}
    </button>
  );
}

const initialState = { status: 'idle', message: '', user: null, fieldErrors: {} };

async function registerAction(previousState, formData) {
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const fieldErrors = {};

  if (name.length < 2) fieldErrors.name = 'Please enter at least 2 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = 'Enter a valid email address.';
  if (password.length < 8) fieldErrors.password = 'Use at least 8 characters.';

  if (Object.keys(fieldErrors).length) {
    return { status: 'error', message: 'Please check the fields below.', user: null, fieldErrors };
  }

  // Demo only: stand-in for a remote registration request. Never store or log
  // a real password in a production app.
  await new Promise((resolve) => window.setTimeout(resolve, 1400));

  return {
    status: 'success',
    message: `Welcome aboard, ${name.split(' ')[0]}! Your demo account is ready.`,
    user: { name, email },
    fieldErrors: {}
  };
}

export default function RegistrationForm({ onRegistered }) {
  const [state, formAction, isPending] = useActionState(async (previousState, formData) => {
    const result = await registerAction(previousState, formData);
    if (result.status === 'success') onRegistered(result.user);
    return result;
  }, initialState);

  return (
    <section className="register-panel" id="register">
      <div className="register-copy">
        <span className="eyebrow">A LITTLE MORE NORTHSTAR</span>
        <h2>Good things<br />start here.</h2>
        <p>Create an account to keep your favourites close and make checkout a little easier.</p>
        <div className="member-perk"><span>✦</span> Your next favourite is waiting.</div>
      </div>
      <div className="register-form-wrap">
        <div className="form-heading">
          <h3>Create your account</h3>
          <p>It takes less than a minute.</p>
        </div>
        <form action={formAction} className="registration-form" noValidate>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" placeholder="Alex Morgan" autoComplete="name" aria-describedby={state.fieldErrors.name ? 'name-error' : undefined} />
          {state.fieldErrors.name && <p className="field-error" id="name-error">{state.fieldErrors.name}</p>}

          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" placeholder="alex@example.com" autoComplete="email" aria-describedby={state.fieldErrors.email ? 'email-error' : undefined} />
          {state.fieldErrors.email && <p className="field-error" id="email-error">{state.fieldErrors.email}</p>}

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="At least 8 characters" autoComplete="new-password" aria-describedby={state.fieldErrors.password ? 'password-error' : undefined} />
          {state.fieldErrors.password && <p className="field-error" id="password-error">{state.fieldErrors.password}</p>}

          {state.status === 'error' && <p className="form-message form-error" role="alert">{state.message}</p>}
          {state.status === 'success' && <p className="form-message form-success" role="status">{state.message}</p>}
          <SubmitButton />
          {isPending && <p className="pending-note" role="status">Securely preparing your demo account…</p>}
          <p className="fine-print">By joining, you agree to our demo terms and privacy policy.</p>
        </form>
      </div>
    </section>
  );
}
