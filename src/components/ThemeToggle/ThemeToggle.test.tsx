import useTheme from '@hooks/useTheme';
jest.mock('@hooks/useTheme', () => require('@__mocks__/useTheme'));

import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';


describe('ThemeToggle component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('renders correctly to match snapshot', () => {
    (useTheme as jest.Mock).mockReturnValue(['light', jest.fn()]);

    const { asFragment } = render(<ThemeToggle />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the opposite icon based on theme - light', () => {
    (useTheme as jest.Mock).mockReturnValueOnce(['light', jest.fn(), false]);

    render(<ThemeToggle />);

    expect(screen.getByTestId('dark-mode-icon')).toBeInTheDocument();
  });

  it('renders the opposite icon based on theme - dark', () => {
    (useTheme as jest.Mock).mockReturnValueOnce(['dark', jest.fn(), false]);
    
    render(<ThemeToggle />);

    expect(screen.getByTestId('light-mode-icon')).toBeInTheDocument();
  });

  it('calls themeToggle when the button is clicked', () => {
    const mockToggleFunc = jest.fn();
    (useTheme as jest.Mock).mockReturnValueOnce(['light', mockToggleFunc]);

    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockToggleFunc).toHaveBeenCalled();
  });
});
