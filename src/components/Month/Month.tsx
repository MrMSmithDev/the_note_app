import Date from '@components/Date';
import { dayData } from '@utils/dateData';
import daysInMonth from '@utils/daysInMonth';
import firstDayInMonth from '@utils/firstDayInMonth';
import { useEffect, useState } from 'react';
import MonthType from 'src/types/MonthType';

export interface MonthProps {
  month: MonthType;
  year: number;
}

const Month: React.FC<MonthProps> = ({ month, year }) => {
  const [days, setDays] = useState<{ date: number }[]>([{ date: 1 }]);
  const [leadingSpace, setLeadingSpace] = useState<number>(0);

  useEffect(() => {
    const daysAmount = daysInMonth(month.num, year);
    const firstDay = firstDayInMonth(month.num, year);

    setLeadingSpace(firstDay);

    const daysArr = Array.from({ length: daysAmount }, (_, i) => ({
      date: i + 1,
    }));
    setDays(daysArr);
  }, [year]);

  return (
    <div className="flex flex-col mb-2 md:mb-0">
      <h3 className="text-center font-bold font-quicksand text-md md:text-sm select-none dark:text-gray-100">
        {month.abbr}
      </h3>
      <div className="grid grid-cols-7 gap-2 my-3 font-quicksand">
        {dayData.map((day, i) => (
          <span
            key={`${day}-${i}`}
            className="text-md md:text-xs font-bold select-none dark:text-gray-200 text-center"
          >
            {day}
          </span>
        ))}
        <div
          role="presentation"
          style={{ gridColumn: `span ${leadingSpace}` }}
        />
        {days.map((day: { date: number }) => (
          <div key={day.date} className="font-quicksand text-center">
            <Date date={day.date} month={month} year={year} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Month;
