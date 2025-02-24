import { render, screen, fireEvent } from '@testing-library/react';
import Date from './Date';

jest.mock('@components/Modal', () => require('@__mocks__/Modal'));
jest.mock('@components/Note', () => require('@__mocks__/Note'));

describe('Date component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly to match snapshot', () => {
    const { asFragment } = render(
      <Date date={3} month={{ abbr: 'MAY', num: 5 }} year={2025} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the date button correctly', () => {
    render(<Date date={5} month={{ abbr: 'FEB', num: 2 }} year={2025} />);

    const btn = screen.getByText('5');
    expect(btn).toBeInTheDocument();
  });

  it('opens the modal when the button is clicked', () => {
    render(<Date date={3} month={{ abbr: 'MAR', num: 3 }} year={2025} />);

    const btn = screen.getByText('3');
    fireEvent.click(btn);

    expect(screen.getByTestId('mock-modal')).toBeInTheDocument();
    expect(screen.getByTestId('mock-note')).toBeInTheDocument();
  });
});
