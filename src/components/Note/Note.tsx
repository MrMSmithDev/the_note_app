import CrossIcon from '@components/icons/CrossIcon';
import { useLocalStorage } from '@hooks/useLocalStorage';
import React, { useEffect, useState } from 'react';
import NoteType from 'src/types/Note';
import { v4 as uuidV4 } from 'uuid';
import formatDate from '@utils/formatDate';

export interface NoteProps {
  date: string;
}

const Note: React.FC<NoteProps> = ({ date }) => {
  const [currentNewNote, setCurrentNewNote] = useState<string>('');
  const [noteData, setNoteData] = useState<NoteType[]>([]);
  const { saveNoteToLocal, removeNoteFromLocal, retrieveNotesFromLocal } =
    useLocalStorage();

  const token = null;

  useEffect(() => {
    async function loadData() {
      // Check if using auth
      if (token) {
        console.log('token');
      } else {
        const result = retrieveNotesFromLocal(date);
        setNoteData(result);
      }
    }

    void loadData();
  }, [date]);

  function handleNewNoteChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentNewNote(e.currentTarget.value);
  }

  function createNote(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const newNote: NoteType = { id: uuidV4(), data: currentNewNote };
    if (token) {
      setTimeout(() => {
        console.log('token');
      }, 5);
    } else {
      saveNoteToLocal(date, newNote);
      setNoteData((prev) => [...prev, newNote]);
    }

    setCurrentNewNote('');
  }

  async function removeNoteData(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const dataId = e.currentTarget.value;
    removeNoteFromLocal(date, dataId);
    setNoteData((prev) => prev.filter((data) => data.id !== dataId));
  }

  return (
    <div className="bg-background dark:bg-background-dark rounded shadow-md p-5 min-w-[300px] w-min animate-slide-down">
      <h4 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 font-bold font-kanit">
        {formatDate(date)}
      </h4>
      <ul className="my-3 flex flex-col gap-2">
        {noteData.map((note: NoteType) => (
          <li key={note.id} className="flex items-center">
            <p className="text-left dark:text-gray-200">{note.data}</p>
            <button
              onClick={removeNoteData}
              className="ml-auto pl-2 cursor-pointer"
              value={note.id}
            >
              <span className="sr-only">Delete Note</span>
              <CrossIcon className="h-3 w-3" fill="#c30010" />
            </button>
          </li>
        ))}
        {noteData.length <= 0 ? (
          <li className="text-center italic text-gray-400">No Notes</li>
        ) : null}
      </ul>
      <form className="flex gap-2 flex-col md:flex-row justify-center mt-2">
        <label className="sr-only" htmlFor="newNote">
          New Note
        </label>
        <input
          className="p-1 border-2 border-gray-200 dark:border-gray-800 focus:outline-gray-400 dark:focus:outline-gray-600 text-sm dark:text-gray-200 tracking-wide min-w-[300px]"
          type="text"
          id="newNote"
          name="newNote"
          placeholder="New Note"
          value={currentNewNote}
          onChange={handleNewNoteChange}
        />
        <button
          onClick={createNote}
          className="py-2 px-4 rounded-md font-quicksand font-bold text-gray-100 mr-auto bg-linear-to-tr from-blue-400 to-blue-600 w-full md:w-max cursor-pointer"
        >
          <span>Add Note</span>
        </button>
      </form>
    </div>
  );
};

export default Note;
