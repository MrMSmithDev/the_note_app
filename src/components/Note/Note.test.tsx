import { render, screen, fireEvent } from '@testing-library/react';
import Note from './Note';
import {
  mockSaveNote,
  mockRemoveNote,
  mockRetrieveNotes,
} from '@__mocks__/useLocalStorage';
import formatDate from '@utils/formatDate';

jest.mock('@hooks/useLocalStorage', () =>
  require('@__mocks__/useLocalStorage')
);

describe('Note component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with date', () => {
    render(<Note date="2025-02-1" />);
    expect(screen.getByText(formatDate('2025-02-1'))).toBeInTheDocument();
  });

  it('calls retrieveNotesFromLocal on mount when no token present', () => {
    render(<Note date="2025-02-1" />);
    expect(mockRetrieveNotes).toHaveBeenCalledWith('2025-02-1');
  });

  it('updates input value when typed into', () => {
    render(<Note date="2025-02-1" />);
    const input = screen.getByPlaceholderText('New Note');
    fireEvent.change(input, { target: { value: 'Test Note' } });
    expect(input).toHaveValue('Test Note');
  });

  it('adds a new note on submit button click and displays it', () => {
    render(<Note date="2025-02-1" />);

    const input = screen.getByPlaceholderText('New Note');
    const addBtn = screen.getByText('Add Note');

    fireEvent.change(input, { target: { value: 'New Test Note' } });
    fireEvent.click(addBtn);

    expect(mockSaveNote).toHaveBeenCalledWith('2025-02-1', expect.any(Object));
    expect(screen.getByText('New Test Note')).toBeInTheDocument();
  });

  it('removes a note on delete button click', () => {
    mockRetrieveNotes.mockReturnValue([{ id: '1', data: 'Test Note' }]);

    render(<Note date="2025-02-1" />);

    const deleteBtn = screen.getByRole('button', { name: 'Delete Note' });
    fireEvent.click(deleteBtn);

    expect(mockRemoveNote).toHaveBeenCalledWith('2025-02-1', '1');
    expect(screen.queryByText('Test Note')).not.toBeInTheDocument();
  });
});
