import React from 'react';

import { ModalProps } from '@components/Modal';

export default function Modal({ children, closeModal }: ModalProps) {
  return (
    <div data-testid="mock-modal">
      {children}
      <button onClick={closeModal}>close modal</button>
    </div>
  );
}
