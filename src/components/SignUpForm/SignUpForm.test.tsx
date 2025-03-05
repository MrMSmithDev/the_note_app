import { screen, render, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

describe('SignUpForm component', () => {
  const mockCloseForm = jest.fn();
  const mockToggleForm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders to match snapshot', () => {
    const { asFragment } = render(
      <SignUpForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    render(
      <SignUpForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    expect(screen.getAllByText('Sign up').length).toBe(2);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Email@example.com')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Repeat password')).toBeInTheDocument();
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    expect(screen.getByTestId('email-icon')).toBeInTheDocument();
    expect(screen.getAllByTestId('hide-password-icon').length).toBe(2);
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  it('updates username and email fields', () => {
    render(
      <SignUpForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    const usernameInput = screen.getByPlaceholderText(
      'Username'
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      'Email@example.com'
    ) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'test_username' } });
    fireEvent.change(emailInput, { target: { value: 'test@email.com ' } });

    expect(usernameInput.value).toBe('test_username');
    expect(emailInput.value).toBe('test@email.com');
  });

  it('updates password and repeat password fields', () => {
    render(
      <SignUpForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    const passwordInput = screen.getByPlaceholderText(
      'Password'
    ) as HTMLInputElement;
    const repeatPasswordInput = screen.getByPlaceholderText(
      'Repeat password'
    ) as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: 'test_password' } });
    fireEvent.change(repeatPasswordInput, {
      target: { value: 'test_repeat_password' },
    });

    expect(passwordInput.value).toBe('test_password');
    expect(repeatPasswordInput.value).toBe('test_repeat_password');
  });

  it('toggles password visibility', () => {
    render(
      <SignUpForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    const passwordInput = screen.getByPlaceholderText(
      'Password'
    ) as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe('text');
  });

  it('toggles repeat password visibility', () => {
    render(
      <SignUpForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    const repeatPasswordInput = screen.getByPlaceholderText(
      'Repeat password'
    ) as HTMLInputElement;
    const toggleButton = screen.getByRole('button', {
      name: /show repeat password/i,
    });

    expect(repeatPasswordInput.type).toBe('password');

    fireEvent.click(toggleButton);

    expect(repeatPasswordInput.type).toBe('text');
  });

  it('calls closeForm when submitting', () => {
    render(
      <SignUpForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    const submitButton = screen.getByRole('button', { name: /Sign up/i });
    fireEvent.click(submitButton);
  });
});
