import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import useTheme from '@hooks/useTheme';

jest.mock('@hooks/useTheme');

describe('ThemeToggle component', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reset mocks before each test
  });

  it('renders correctly to match snapshot', () => {
    (useTheme as jest.Mock).mockReturnValue(['light', jest.fn()]);

    const { asFragment } = render(<ThemeToggle />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the opposite icon based on theme', async () => {
    (useTheme as jest.Mock).mockReturnValue(['light', jest.fn()]);

    render(<ThemeToggle />);
    expect(screen.getByTestId('dark-mode-icon')).toBeInTheDocument();

    (useTheme as jest.Mock).mockReturnValueOnce(['dark', jest.fn()]);

    render(<ThemeToggle />);

    expect(screen.getByTestId('light-mode-icon')).toBeInTheDocument();
  });

  it('calls themeToggle when the button is clicked', () => {
    const mockToggleFunc = jest.fn();
    (useTheme as jest.Mock).mockReturnValueOnce(['light', mockToggleFunc]);

    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button')); // Simulate button click

    expect(mockToggleFunc).toHaveBeenCalled();
  });
});
