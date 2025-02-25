import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

jest.mock('@components/ThemeToggle', () => require('@__mocks__/ThemeToggle'));

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
});
