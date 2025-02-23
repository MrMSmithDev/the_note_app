import Modal from '@components/Modal';
import Note from '@components/Note';
import React, { useRef, useState } from 'react';
import MonthType from 'src/types/MonthType';

interface DateProps {
  date: number;
  month: MonthType;
  year: number;
}

const Date: React.FC<DateProps> = ({ date, month, year }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);

  function openNote(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setShowModal(true);
  }

  const dateString = `${year}-${month.num >= 10 ? month.num : '0' + month.num}-${date}`;

  return (
    <div>
      <button
        ref={ref}
        className="cursor-pointer select-none w-full rounded"
        onClick={openNote}
      >
        <span className="text-sm dark:text-gray-400">{date}</span>
      </button>
      {showModal ? (
        <Modal closeModal={() => setShowModal(false)} btnRef={ref}>
          <Note date={dateString} />
        </Modal>
      ) : null}
    </div>
  );
};

export default Date;
