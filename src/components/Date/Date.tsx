import React from 'react';
import MonthType from 'src/types/MonthType';

interface DateProps {
  date: number;
  month: MonthType;
  year: number;
}

const Date: React.FC<DateProps> = ({ date, month, year }) => {
  const dateString = `${year}-${month.num >= 10 ? month.num : '0' + month.num}-${date}`;

  return (
    <div>
      <button
        className="cursor-pointer select-none w-full rounded"
        onClick={() => console.log(dateString)}
      >
        <span className="text-sm">{date}</span>
      </button>
    </div>
  );
};

export default Date;
