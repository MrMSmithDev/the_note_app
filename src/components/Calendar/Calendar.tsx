import React, { useEffect, useState } from 'react';
import Year from '@components/Year/';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@hooks/useLocalStorage';
import ChevronIcon from '@components/icons/ChevronIcon';

const Calendar: React.FC = () => {
  const [fullYear, setFullYear] = useState<number>(new Date().getFullYear());
  const [animationDirection, setAnimationDirection] = useState<-1 | 1>(1);

  const { loadYear } = useLocalStorage();

  const token = null;

  function handleYearChange(e: React.MouseEvent<HTMLButtonElement>) {
    const valueChange = parseInt(e.currentTarget.value);
    setAnimationDirection(valueChange > 0 ? 1 : -1);
    setTimeout(() => {
      // Allows time for direction to set before animating change
      setFullYear((prev) => (prev += valueChange));
    }, 0);
  }

  useEffect(() => {
    if (token) {
    } else {
      loadYear(fullYear);
    }
  }, [fullYear]);

  return (
    <main className="h-[calc(100lvh-48px)] p-5">
      <nav className="flex justify-center px-10 items-center my-5 w-full">
        <button
          className="font-bold cursor-pointer disabled:opacity-50"
          onClick={handleYearChange}
          value={-1}
          disabled={fullYear <= 2010}
        >
          <span className="sr-only">previous</span>
          <ChevronIcon
            className="h-4 w-4 fill-[#0a0a0a] dark:fill-[#fff]"
            inverted={true}
          />
        </button>
        <AnimatePresence mode="wait">
          <motion.h1
            key={fullYear}
            initial={{ opacity: 0, x: animationDirection * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -animationDirection * 20 }}
            transition={{ duration: 0.2 }}
            className="text-3xl font-bold font-kanit italics text-transparent bg-clip-text bg-linear-to-tr from-blue-400 to-blue-600 py-2 mx-10 w-50 text-center"
          >
            {fullYear}
          </motion.h1>
        </AnimatePresence>
        <button
          className="font-bold cursor-pointer disabled:opacity-50"
          onClick={handleYearChange}
          value={1}
          disabled={fullYear >= 2030}
        >
          <span className="sr-only">next</span>
          <ChevronIcon className="h-4 w-4 fill-[#0a0a0a] dark:fill-[#fff]" />
        </button>
      </nav>
      <div className="flex justify-center h-3/4 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={fullYear}
            initial={{ opacity: 0, x: animationDirection * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -animationDirection * 20 }}
            transition={{ duration: 0.2 }}
          >
            <Year year={fullYear} />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Calendar;
