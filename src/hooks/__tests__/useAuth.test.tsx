import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@hooks/useAuth';
import { fetchData } from '@utils/fetchData';
import { isTokenExpired } from '@utils/isTokenExpired';

jest.mock('@utils/fetchData', () => require('@__mocks__/fetchData'));
jest.mock('@utils/isTokenExpired', () => require('@__mocks__/isTokenExpired'));

describe('useAuth hook', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'removeItem');

    localStorage.setItem('token', 'test_token');
    localStorage.setItem('initial', 't');
  });

  it('throws an error when used outside of an AuthProvider', () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth must be used within an AuthProvider'
    );
  });

  it('loads token and initial from localStorage on opening', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => {
      expect(result.current.authLoading).toBe(false);
    });

    expect(result.current.token).toBe('test_token');
    expect(result.current.initial).toBe('t');
  });

  it('checks whether the retrieved token has expired', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => {
      expect(result.current.authLoading).toBe(false);
    });

    expect(isTokenExpired).toHaveBeenCalledWith('test_token');
  });

  it('removes token if expired and refreshes', async () => {
    (isTokenExpired as jest.Mock).mockReturnValueOnce(true);

    localStorage.setItem('token', 'expired_token');
    (fetchData as jest.Mock).mockResolvedValueOnce({
      token: 'new_token',
      user: { username: 'New_initial' },
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => {
      expect(result.current.authLoading).toBe(false);
    });

    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(fetchData).toHaveBeenCalledWith(
      expect.stringContaining('/user/refresh'),
      expect.objectContaining({ method: 'POST' })
    );
    expect(result.current.token).toBe('new_token');
    expect(result.current.initial).toBe('N');
  });

  it('clears localStorage from auth memory allocation on signout', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => {
      expect(result.current.authLoading).toBe(false);
    });

    expect(result.current.token).toBe('test_token');
    expect(result.current.initial).toBe('t');

    act(() => result.current.signout());

    expect(result.current.token).toBe(null);
    expect(result.current.initial).toBe(null);
  });

  it('signs out when refresh fails', async () => {
    (isTokenExpired as jest.Mock).mockReturnValueOnce(true);
    (fetchData as jest.Mock).mockRejectedValueOnce(new Error('Refresh failed'));

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => {
      expect(result.current.authLoading).toBe(false);
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('initial');
    expect(result.current.token).toBe(null);
    expect(result.current.initial).toBe(null);
  });
});
