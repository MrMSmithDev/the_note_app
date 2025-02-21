export default function firstDayInMonth(month: number, year: number) {
  return new Date(year, month - 1, 1).getUTCDay();
}
