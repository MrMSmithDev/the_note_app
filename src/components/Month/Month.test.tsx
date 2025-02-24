import { render, screen } from '@testing-library/react';
import Month from './Month';
import { dayData } from '@utils/dateData';
import daysInMonth from '@utils/daysInMonth';
import firstDayInMonth from '@utils/firstDayInMonth';

jest.mock('@components/Date', () => require('@__mocks__/Date'));

jest.mock('@utils/daysInMonth', () => jest.fn());
jest.mock('@utils/firstDayInMonth', () => jest.fn());

describe('Month component', () => {
  const mockMonth = { num: 2, abbr: 'FEB' }; // February
  const mockYear = 2025;

  beforeEach(() => {
    jest.clearAllMocks();

    (daysInMonth as jest.Mock).mockReturnValue(28);
    (firstDayInMonth as jest.Mock).mockReturnValue(3);
  });

  it('renders correctly to match snapshot', () => {
    const { asFragment } = render(<Month month={mockMonth} year={mockYear} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correct month abbreviation', () => {
    render(<Month month={mockMonth} year={mockYear} />);

    expect(screen.getByText('FEB')).toBeInTheDocument();
  });

  it('renders the correct number of days for the month', () => {
    render(<Month month={mockMonth} year={mockYear} />);

    const days = screen.getAllByTestId('mock-date');
    expect(days.length).toBe(28);
    expect(days[0]).toHaveTextContent('1');
    expect(days[27]).toHaveTextContent('28');
  });

  it('creates correct leadings spaces in grid', () => {
    render(<Month month={mockMonth} year={mockYear} />);

    const leadingSpaceDiv = screen.getByRole('presentation', { hidden: true });
    expect(leadingSpaceDiv).toHaveStyle('grid-column: span 3');
  });

  it('renders the weekday labels correctly', () => {
    render(<Month month={mockMonth} year={mockYear} />);

    dayData.forEach((day) => {
      const elements = screen.getAllByText(day, { exact: true });
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('updates when the year changes', () => {
    const { rerender } = render(<Month month={mockMonth} year={2024} />);
    expect(screen.getAllByTestId('mock-date').length).toBe(28);

    (daysInMonth as jest.Mock).mockReturnValue(31);
    rerender(<Month month={{ abbr: 'MAR', num: 3 }} year={2025} />);

    expect(screen.getByText('MAR')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-date').length).toBe(31);
  });
});
