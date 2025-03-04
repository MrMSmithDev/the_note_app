import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Note from './Note';
import {
  mockSaveNote,
  mockRemoveNote,
  mockRetrieveNotes,
  mockUpdateNote,
} from '@__mocks__/useLocalStorage';
import formatDate from '@utils/formatDate';

jest.mock('@hooks/useLocalStorage', () =>
  require('@__mocks__/useLocalStorage')
);

describe('Note component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly to match snapshot', () => {
    const { asFragment } = render(<Note date="2025-01-5" />);

    expect(asFragment()).toMatchSnapshot();
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

  it('sets a note to edit on edit button click, filled with the previous note', () => {
    mockRetrieveNotes.mockReturnValue([{ id: '1', data: 'Test Note' }]);

    render(<Note date="2025-02-1" />);

    const editBtn = screen.getByRole('button', { name: 'Edit Note' });
    fireEvent.click(editBtn);

    expect(screen.getByTestId('note-to-update')).toHaveValue('Test Note');
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('updates a note with a new value when submitted', () => {
    mockRetrieveNotes.mockReturnValue([{ id: '1', data: 'Test Note' }]);

    render(<Note date="2025-02-1" />);

    const editBtn = screen.getByRole('button', { name: 'Edit Note' });
    fireEvent.click(editBtn);

    const editInput = screen.getByTestId('note-to-update');
    fireEvent.change(editInput, { target: { value: 'Test Note updated' } });

    const submitBtn = screen.getByRole('button', { name: 'Update' });
    fireEvent.click(submitBtn);

    expect(screen.queryByTestId('note-to-update')).not.toBeInTheDocument();
    expect(mockUpdateNote).toHaveBeenCalledWith("2025-02-1", { id: '1', data: 'Test Note updated' });
    expect(screen.getByText('Test Note updated')).toBeInTheDocument();
  });

  it('cancels an update to a note when Cancel button clicked', () => {
    mockRetrieveNotes.mockReturnValue([{ id: '1', data: 'Test Note' }]);

    render(<Note date="2025-02-1" />);

    const editBtn = screen.getByRole('button', { name: 'Edit Note' });
    fireEvent.click(editBtn);

    const editInput = screen.getByTestId('note-to-update');
    fireEvent.change(editInput, { target: { value: 'Test Note updated' } });

    const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelBtn);

    expect(screen.queryByTestId('note-to-update')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Note updated')).not.toBeInTheDocument();
  });
});
