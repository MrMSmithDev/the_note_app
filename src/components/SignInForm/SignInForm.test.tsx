import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from '@__mocks__/SignInForm';

describe('SignInForm component', () => {
  const mockCloseForm = jest.fn();
  const mockToggleForm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders to match snapshot', () => {
    const { asFragment } = render(
      <SignInForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    render(
      <SignInForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    expect(screen.getAllByText('Log in').length).toHaveValue(2);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
    expect(screen.getByTestId('show-password-icon')).toBeInTheDocument();
  });

  it('updates username and password fields', () => {
    render(
      <SignInForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    const usernameInput = screen.getByPlaceholderText(
      'Username'
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      'Password'
    ) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'test_username' } });
    fireEvent.change(passwordInput, { target: { value: 'test_password' } });

    expect(usernameInput.value).toBe('test_password');
    expect(passwordInput.value).toBe('test_password');
  });

  it('toggles password visibility', () => {
    render(
      <SignInForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    const passwordInput = screen.getByPlaceholderText(
      'Password'
    ) as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);

    expect(passwordInput.type).toBe('text');
  });

  it('calls closeForm when submitting', () => {
    render(
      <SignInForm closeForm={mockCloseForm} toggleForm={mockToggleForm} />
    );

    const submitButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(submitButton);
  });
});
