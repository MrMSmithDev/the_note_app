export const mockTheme = 'light';
export const mockToggleTheme = jest.fn(() => {});

const useTheme = jest.fn(() => [mockTheme, mockToggleTheme]);

export default useTheme;
