import { monthsData } from './dateData';

export default function formatDate(dateString: string): string {
  const [yearStr, monthStr, dateStr] = dateString.split('-');

  // Set date suffix
  const dateNum = parseInt(dateStr, 10);
  let dateSuffix = 'th';

  if (![11, 12, 13].includes(dateNum)) {
    if (dateNum % 10 === 1) dateSuffix = 'st';
    if (dateNum % 10 === 2) dateSuffix = 'nd';
    if (dateNum % 10 === 3) dateSuffix = 'rd';
  }

  // Retrieve month name
  const monthNum = parseInt(monthStr, 10);
  const month = monthsData[monthNum - 1].abbr || 'UNKNOWN';

  return `${dateStr}${dateSuffix} ${month} ${yearStr}`;
}
