import React, { createContext, useContext, useState } from 'react';
import type LocalDataStruct from 'src/types/LocalDataStruct';
import Note from 'src/types/Note';

interface LocalStorageContextType {
  currentData: LocalDataStruct;
  saveNoteToLocal: (dateString: string, note: Note) => void;
  removeNoteFromLocal: (dateString: string, noteId: string) => void;
  loadYear: (year: number) => void;
  retrieveNotesFromLocal: (dateString: string) => Note[];
}

interface LocalStorageProviderProps {
  children: React.ReactNode;
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(
  undefined
);

const LocalStorageProvider: React.FC<LocalStorageProviderProps> = ({
  children,
}) => {
  const [currentData, setCurrentData] = useState<LocalDataStruct>({});

  function loadYear(year: number) {
    const storedData = localStorage.getItem(year.toString());

    if (storedData) setCurrentData(JSON.parse(storedData));
    else setCurrentData({});
  }

  function saveNoteToLocal(dateString: string, note: Note) {
    const [yearStr, monthStr, dateStr] = dateString.split('-');
    const month = parseInt(monthStr, 10);
    const date = parseInt(dateStr, 10);

    setCurrentData((prev) => {
      const updatedMonthData = {
        ...prev[month],
        [date]: [...(prev[month]?.[date] || []), note],
      };

      const updatedYearData = {
        ...prev,
        [month]: updatedMonthData,
      };

      localStorage.setItem(yearStr, JSON.stringify(updatedYearData));

      return updatedYearData;
    });
  }

  function removeNoteFromLocal(dateString: string, noteId: string) {
    const [yearStr, monthStr, dateStr] = dateString.split('-');
    const month = parseInt(monthStr, 10);
    const date = parseInt(dateStr, 10);

    setCurrentData((prev) => {
      const updatedMonthData = {
        ...prev[month],
        [date]: prev[month]?.[date].filter((note) => note.id !== noteId),
      };

      const updatedYearData = {
        ...prev,
        [month]: updatedMonthData,
      };

      localStorage.setItem(yearStr, JSON.stringify(updatedYearData));

      return updatedYearData;
    });
  }

  function retrieveNotesFromLocal(dateString: string): Note[] {
    const [_, monthStr, dateStr] = dateString.split('-');
    const month = parseInt(monthStr, 10);
    const date = parseInt(dateStr, 10);

    return currentData[month]?.[date] || [];
  }

  return (
    <LocalStorageContext.Provider
      value={{
        currentData,
        saveNoteToLocal,
        removeNoteFromLocal,
        loadYear,
        retrieveNotesFromLocal,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export function useLocalStorage(): LocalStorageContextType {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error(
      'useLocalStorage must be used within a LocalStorageProvider'
    );
  }
  return context;
}

export default LocalStorageProvider;
