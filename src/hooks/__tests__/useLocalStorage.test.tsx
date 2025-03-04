import { renderHook, act, render, waitFor } from '@testing-library/react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import LocalStorageProvider from '@hooks/useLocalStorage';
import type Note from 'src/types/Note';

const mockNote: Note = { data: 'Test Note', id: '1' };

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'setItem');
  });

  it('throws an error when used outside of LocalStorageProvider', () => {
    expect(() => renderHook(() => useLocalStorage())).toThrow(
      'useLocalStorage must be used within a LocalStorageProvider'
    );
  });

  it('loads year from localStorage', () => {
    localStorage.setItem('2025', JSON.stringify({ 1: { 1: [mockNote] } }));

    const { result } = renderHook(() => useLocalStorage(), {
      wrapper: LocalStorageProvider,
    });

    act(() => {
      result.current.loadYear(2025);
    });

    expect(result.current.currentData).toEqual({ 1: { 1: [mockNote] } });
  });

  it('saves a note to localStorage', async () => {
    const { result } = renderHook(() => useLocalStorage(), {
      wrapper: LocalStorageProvider,
    });

    act(() => {
      result.current.loadYear(2025);
      result.current.saveNoteToLocal('2025-02-3', mockNote);
    });

    await waitFor(() => {
      expect(result.current.currentData).toEqual({ 2: { 3: [mockNote] } });
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        '2025',
        JSON.stringify({
          2: { 3: [mockNote] },
        })
      );
    });
  });

  it('removes the date key from localStorage when no more notes remain for date', async () => {
    localStorage.setItem(
      '2025',
      JSON.stringify({
        5: { 6: [mockNote] },
      })
    );

    const { result } = renderHook(() => useLocalStorage(), {
      wrapper: LocalStorageProvider,
    });

    act(() => {
      result.current.removeNoteFromLocal('2025-05-6', '1');
    });

    await waitFor(() => {
      expect(result.current.currentData).toEqual({ 5: {} });
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        '2025',
        JSON.stringify({ 5: {} })
      );
    });
  });

  it('removes a note from localStorage when more than one note is set to date', async () => {
    localStorage.setItem(
      '2025',
      JSON.stringify({
        5: { 6: [mockNote, { id: '3', data: 'Remaining Note' }] },
      })
    );

    const { result } = renderHook(() => useLocalStorage(), {
      wrapper: LocalStorageProvider,
    });

    act(() => {
      result.current.loadYear(2025);
      result.current.removeNoteFromLocal('2025-05-6', '1');
    });

    await waitFor(() => {
      expect(result.current.currentData).toEqual({
        5: { 6: [{ id: '3', data: 'Remaining Note' }] },
      });
      expect(localStorage.setItem).toHaveBeenLastCalledWith(
        '2025',
        JSON.stringify({ 5: { 6: [{ id: '3', data: 'Remaining Note' }] } })
      );
    });
  });

  it('retrieves notes for a given date from localStorage', () => {
    localStorage.setItem('2025', JSON.stringify({ 1: { 1: [mockNote] } }));

    const { result } = renderHook(() => useLocalStorage(), {
      wrapper: LocalStorageProvider,
    });

    act(() => {
      result.current.loadYear(2025);
    });

    const notes = result.current.retrieveNotesFromLocal('2025-01-1');

    expect(notes).toEqual([mockNote]);
  });

  it('updates a note to localStorage when it is the only note set', () => {
    localStorage.setItem('2025', JSON.stringify({ 1: { 1: [mockNote] } }));

    const { result } = renderHook(() => useLocalStorage(), {
      wrapper: LocalStorageProvider,
    });

    const updatedNote = { id: '1', data: 'Updated Note' };

    act(() => {
      result.current.loadYear(2025);
      result.current.updateNoteToLocal('2025-01-1', updatedNote);
    });

    expect(result.current.currentData).toEqual({ 1: { 1: [updatedNote] } });
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      '2025',
      JSON.stringify({ 1: { 1: [updatedNote] } })
    );
  });

  it('updates a note to localStorage when more than one note is set', () => {
    localStorage.setItem(
      '2025',
      JSON.stringify({
        3: { 5: [mockNote, { id: '2', data: 'Another Note' }] },
      })
    );

    const { result } = renderHook(() => useLocalStorage(), {
      wrapper: LocalStorageProvider,
    });

    const updatedNote = { id: '1', data: 'Updated Note' };

    act(() => {
      result.current.loadYear(2025);
      result.current.updateNoteToLocal('2025-03-5', updatedNote);
    });

    expect(result.current.currentData).toEqual({
      3: {
        5: [
          { id: '1', data: 'Updated Note' },
          { id: '2', data: 'Another Note' },
        ],
      },
    });

    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      '2025',
      JSON.stringify({
        3: {
          5: [
            { id: '1', data: 'Updated Note' },
            { id: '2', data: 'Another Note' },
          ],
        },
      })
    );
  });
});
