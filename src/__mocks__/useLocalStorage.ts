export const mockSaveNote = jest.fn();
export const mockRemoveNote = jest.fn();
export const mockRetrieveNotes = jest.fn().mockReturnValue([]);
export const mockLoadYear = jest.fn();
export const mockUpdateNote = jest.fn();

export const useLocalStorage = jest.fn(() => ({
  loadYear: mockLoadYear,
  saveNoteToLocal: mockSaveNote,
  removeNoteFromLocal: mockRemoveNote,
  retrieveNotesFromLocal: mockRetrieveNotes,
  updateNoteToLocal: mockUpdateNote,
}));
