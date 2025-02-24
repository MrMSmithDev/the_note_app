import { MonthProps } from '@components/Month/Month';

export default function ({ month, year }: MonthProps) {
  return (
    <div data-testid="mock-month">
      {month.abbr}
    </div>
  );
}
