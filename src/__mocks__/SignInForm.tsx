import { SignInFormProps } from '@components/SignInForm';

export default function SignInForm({ closeForm, toggleForm }: SignInFormProps) {
  return (
    <div data-testid="mock-sign-in-form">
      <button onClick={closeForm}>close sign in</button>
      <button onClick={toggleForm}>switch to sign up form</button>
    </div>
  );
}
