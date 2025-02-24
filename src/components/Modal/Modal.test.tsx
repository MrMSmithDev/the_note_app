import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Modal from './Modal';
import React from 'react';

describe('Modal component', () => {
  let closeModal: jest.Mock;
  let btnRef: React.RefObject<HTMLButtonElement>;
  const mockChild: React.ReactNode = <p>Test Modal Child</p>;

  beforeEach(() => {
    closeModal = jest.fn();
    btnRef = { current: document.createElement('button') };
  });

  it('renders children correctly', () => {
    render(
      <Modal closeModal={closeModal} btnRef={btnRef}>
        {mockChild}
      </Modal>
    );

    expect(screen.getByText('Test Modal Child')).toBeInTheDocument();
  });

  it('calls closeModal when clicking outside', async () => {
    render(
      <div data-testid="Outer">
        <button ref={btnRef}>Open Modal</button>
        <Modal closeModal={closeModal} btnRef={btnRef}>
          {mockChild}
        </Modal>
      </div>
    );

    await waitFor(() =>
      expect(screen.getByText('Test Modal Child')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId('Outer'));

    await waitFor(() => expect(closeModal).toHaveBeenCalled());
  });

  it('does not call closeModal when clicking inside', async () => {
    render(
      <Modal closeModal={closeModal} btnRef={btnRef}>
        {mockChild}
      </Modal>
    );

    await waitFor(() =>
      expect(screen.getByText('Test Modal Child')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Test Modal Child'));

    await waitFor(() => expect(closeModal).not.toHaveBeenCalled());
  });
});
