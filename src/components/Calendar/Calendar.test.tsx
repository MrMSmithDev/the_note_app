import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calendar from './Calendar';
import { mockLoadYear } from '@__mocks__/useLocalStorage';

// Mock useLocalStorage
jest.mock('@hooks/useLocalStorage', () =>
  require('@__mocks__/useLocalStorage')
);

// Mock Year component
jest.mock('@components/Year', () => require('@__mocks__/Year'));

describe('Calendar component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly to match snapshot', () => {
    const { asFragment } = render(<Calendar />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with the current year initially', () => {
    const currentYear = new Date().getFullYear();

    render(<Calendar />);
    expect(screen.getByText(currentYear.toString())).toBeInTheDocument();
  });

  it('calls loadYear with the correct year on mount', () => {
    // const { loadYear } = useLocalStorage();
    const currentYear = new Date().getFullYear();

    render(<Calendar />);

    expect(mockLoadYear).toHaveBeenCalledWith(currentYear);
  });

  it('increments the year when the next button is clicked', async () => {
    render(<Calendar />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    const currentYear = new Date().getFullYear();

    fireEvent.click(nextButton);

    expect(
      await screen.findByText((currentYear + 1).toString())
    ).toBeInTheDocument();
  });

  it('decrements the year when the previous button is clicked', async () => {
    render(<Calendar />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    const currentYear = new Date().getFullYear();

    fireEvent.click(prevButton);

    expect(
      await screen.findByText((currentYear - 1).toString())
    ).toBeInTheDocument();
  });

  it('disables the previous button at the lower year limit (2010)', async () => {
    render(<Calendar />);

    const prevButton = screen.getByRole('button', { name: /previous/i });

    for (let i = new Date().getFullYear(); i > 2009; i--) {
      fireEvent.click(prevButton);
    }

    await waitFor(() => expect(prevButton).toBeDisabled());
  });

  it('disables the next button at the upper year limit (2030)', async () => {
    render(<Calendar />);

    const nextButton = screen.getByRole('button', { name: /next/i });

    for (let i = new Date().getFullYear(); i < 2030; i++) {
      fireEvent.click(nextButton);
    }

    await waitFor(() => expect(nextButton).toBeDisabled());
  });
});
