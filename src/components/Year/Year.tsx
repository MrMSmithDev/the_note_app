import React from 'react';
import { monthsData } from '@utils/dateData';
import MonthType from 'src/types/MonthType';
import Month from '@components/Month';

interface YearProps {
  year: number;
}

const Year: React.FC<YearProps> = ({ year }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-3 h-1/2 mt-10">
      {monthsData.map((month: MonthType) => (
        <Month key={month.num} month={month} year={year} />
      ))}
    </div>
  );
};

export default Year;
