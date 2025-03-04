import { CrossIcon, EditIcon } from '@components/icons';
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

  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const {
    saveNoteToLocal,
    removeNoteFromLocal,
    retrieveNotesFromLocal,
    updateNoteToLocal,
  } = useLocalStorage();

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

  useEffect(() => {
    const previousNote = noteData.filter((note) => note.id === editingNote)[0];
    if (previousNote) {
      setEditValue(previousNote.data);
    } else {
      setEditValue('');
    }
  }, [editingNote]);

  function handleNewNoteChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentNewNote(e.currentTarget.value);
  }

  function createNote(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (currentNewNote.length <= 0) return;

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

  function handleEditChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditValue(e.currentTarget.value);
  }

  function updateNote(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setEditingNote(e.currentTarget.value);
  }

  function cancelUpdateNote(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setEditingNote(null);
  }

  function submitUpdateNote(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const newNote = { id: editingNote, data: editValue };

    setNoteData((prev) =>
      prev.map((note) => (note.id === newNote.id ? newNote : note))
    );
    updateNoteToLocal(date, newNote);

    setEditingNote(null);
    setEditValue('');
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
        {noteData.map((note: NoteType) =>
          note.id === editingNote ? (
            <li key={note.id}>
              <div className="flex flex-col md:flex-row items-center gap-1">
                <label htmlFor="note-to-update" className="sr-only">
                  Updated note
                </label>
                <textarea
                  id="note-to-update"
                  data-testid="note-to-update"
                  className="p-1 border-2 border-gray-200 dark:border-gray-800 focus:outline-gray-400 dark:focus:outline-gray-600 text-sm dark:text-gray-200 tracking-wide min-w-[300px] resize-none"
                  rows={1}
                  value={editValue}
                  onChange={handleEditChange}
                  placeholder="Note..."
                />
                <div className="flex gap-1 w-full">
                  <button
                    onClick={submitUpdateNote}
                    className="py-2 px-4 rounded-md font-quicksand font-bold text-gray-100 mr-auto bg-linear-to-tr from-blue-400 to-blue-600 w-full md:w-max cursor-pointer disabled:opacity-50"
                  >
                    <span>Update</span>
                  </button>
                  <button
                    onClick={cancelUpdateNote}
                    className="py-2 px-4 rounded-md font-quicksand font-bold text-gray-100 mr-auto bg-linear-to-tr from-red-400 to-red-600 w-full md:w-max cursor-pointer disabled:opacity-50"
                  >
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </li>
          ) : (
            <li key={note.id} className="flex items-center gap-1">
              <p className="text-left dark:text-gray-200">{note.data}</p>
              <button
                onClick={updateNote}
                className="ml-auto pl-2 cursor-pointer"
                value={note.id}
              >
                <span className="sr-only">Edit Note</span>
                <EditIcon className="h-5 w-5" />
              </button>
              <button
                onClick={removeNoteData}
                className="pl-2 cursor-pointer"
                value={note.id}
              >
                <span className="sr-only">Delete Note</span>
                <CrossIcon className="h-3 w-3" fill="#c30010" />
              </button>
            </li>
          )
        )}
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
          className="py-2 px-4 rounded-md font-quicksand font-bold text-gray-100 mr-auto bg-linear-to-tr from-blue-400 to-blue-600 w-full md:w-max cursor-pointer disabled:opacity-50"
          disabled={!!editingNote}
        >
          <span>Add Note</span>
        </button>
      </form>
    </div>
  );
};

export default Note;
