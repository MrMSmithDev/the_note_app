import Month from 'src/types/MonthType';

const dayData: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const monthsData: Month[] = [
  { abbr: 'JAN', num: 1 },
  { abbr: 'FEB', num: 2 },
  { abbr: 'MAR', num: 3 },
  { abbr: 'APR', num: 4 },
  { abbr: 'MAY', num: 5 },
  { abbr: 'JUN', num: 6 },
  { abbr: 'JUL', num: 7 },
  { abbr: 'AUG', num: 8 },
  { abbr: 'SEP', num: 9 },
  { abbr: 'OCT', num: 10 },
  { abbr: 'NOV', num: 11 },
  { abbr: 'DEC', num: 12 },
];

export { dayData, monthsData };
