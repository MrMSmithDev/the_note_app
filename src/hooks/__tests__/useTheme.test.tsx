import { renderHook, act, waitFor } from '@testing-library/react';
import useTheme from '@hooks/useTheme';

describe('useTheme hook', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(document.documentElement.classList, 'add');
    jest.spyOn(document.documentElement.classList, 'remove');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sets the theme based on localStorage or prefers-color-scheme', async () => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: false })),
      writable: true,
    });
    localStorage.setItem('theme', 'dark');

    const { result } = renderHook(() => useTheme());

    await waitFor(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith('theme');
      expect(result.current[0]).toBe('dark');
    });
  });

  it('sets default theme to light if no preferences found', () => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: false })),
      writable: true,
    });

    const { result } = renderHook(() => useTheme());

    expect(localStorage.getItem).toHaveBeenCalledWith('theme');
    expect(result.current[0]).toBe('light');
  });

  it('sets default theme to dark if prefers-color-scheme preference found', () => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: true })),
      writable: true,
    });

    const { result } = renderHook(() => useTheme());

    expect(result.current[0]).toBe('dark');
  });

  it('toggles theme from light to dark', () => {
    localStorage.setItem('theme', 'light');
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith(
      'light'
    );
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });

  it('toggles theme from dark to light', () => {
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe('light');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith(
      'dark'
    );
    expect(document.documentElement.classList.add).toHaveBeenCalledWith(
      'light'
    );
  });
});
