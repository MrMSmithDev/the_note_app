import React, { useState } from 'react';
import monthsData from '@utils/dateData';
import Year from '@components/Year/Year';

const Calendar: React.FC = () => {
  const [fullYear, setFullYear] = useState<number>(new Date().getFullYear());

  return (
    <main className="h-[calc(100lvh-48px)] p-5">
      <nav className="flex justify-between px-10 items-center my-5">
        <button> {'<'} </button>
        <h1 className="text-3xl font-bold font-kanit italics text-transparent bg-clip-text bg-linear-to-tr from-blue-400 to-blue-600 py-2">2025</h1>
        <button> {'>'} </button>
      </nav>
      <div className="flex justify-center h-3/4 w-full">
        <Year year={2025} />
      </div>
    </main>
  );
};

export default Calendar;
