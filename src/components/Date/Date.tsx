import Modal from '@components/Modal';
import Note from '@components/Note';
import { useRef, useState } from 'react';
import MonthType from 'src/types/MonthType';

export interface DateProps {
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
        className="cursor-pointer select-none w-full rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        onClick={openNote}
      >
        <span className="text-md md:text-sm dark:text-gray-400">{date}</span>
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
