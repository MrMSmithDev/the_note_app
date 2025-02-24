import { render, screen } from '@testing-library/react';
import Year from './Year';
import { monthsData } from '@utils/dateData';

jest.mock('@components/Month', () => require('@__mocks__/Month'));

describe('Year component', () => {
  const mockYear = 2025;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly to match snapshot', () => {
    const { asFragment } = render(<Year year={mockYear} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the month labels correctly', () => {
    render(<Year year={mockYear} />);

    monthsData.forEach((month) => {
      expect(screen.getByText(month.abbr)).toBeInTheDocument();
    });
  });

  it('renders the correct amount of months', () => {
    render(<Year year={mockYear} />);

    expect(screen.getAllByTestId('mock-month').length).toBe(12);
  });
});
