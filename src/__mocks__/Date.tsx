import type { DateProps } from '@components/Date/Date';

export default function Date({ date, month, year }: DateProps ) {
  return (
    <div data-testid="mock-date">
      Date for: {`${year}-${month.num}-${date}`}
    </div>
  );
}
