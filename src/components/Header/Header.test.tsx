import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';

jest.mock('@components/Modal', () => require('@__mocks__/Modal'));
jest.mock('@components/ThemeToggle', () => require('@__mocks__/ThemeToggle'));
jest.mock('@components/SignInForm', () => require('@__mocks__/SignInForm'));
jest.mock('@components/SignUpForm', () => require('@__mocks__/SignUpForm'));

describe('Header component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the site name', () => {
    render(<Header />);

    expect(screen.getByText('NOTES')).toBeInTheDocument();
  });

  it('renders the log in button', () => {
    render(<Header />);

    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('renders the theme toggle component', () => {
    render(<Header />);

    expect(screen.getByTestId('mock-theme-toggle')).toBeInTheDocument();
  });

  it('opens the SignInForm when clicking the log in button', () => {
    render(<Header />);

    fireEvent.click(screen.getByText('Log in'));

    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sign-in-form')).toBeInTheDocument();
  });

  it('closes the SignInForm when clicking close', async () => {
    render(<Header />);

    fireEvent.click(screen.getByText('Log in'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-sign-in-form')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('close sign in'));
    await waitFor(() => {
      expect(screen.queryByTestId('mock-sign-in-form')).toBeNull();
    });
  });

  it('switches from SignInForm to SignUpForm when clicking toggle', async () => {
    render(<Header />);

    fireEvent.click(screen.getByText('Log in'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-sign-in-form')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('switch to sign up form'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-sign-up-form')).toBeInTheDocument();
    });
  });

  it('closes the SignUpForm when clicking close', async () => {
    render(<Header />);

    fireEvent.click(screen.getByText('Log in'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-sign-in-form')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('switch to sign up form'));
    await waitFor(() => {
      expect(screen.getByTestId('mock-sign-up-form')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('close sign up'));
    await waitFor(() => {
      expect(screen.queryByTestId('mock-sign-up-form')).toBeNull();
    });
  });
});
