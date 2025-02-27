import { SignUpFormProps } from '@components/SignUpForm';

export default function SignUpForm({ closeForm, toggleForm }: SignUpFormProps) {
  return (
    <div data-testid="mock-sign-up-form">
      <button onClick={closeForm}>close sign up</button>
      <button onClick={toggleForm}>switch to sign in form</button>
    </div>
  );
}
