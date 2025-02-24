import React from 'react';

interface MockModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: MockModalProps) {
  return <div data-testid="mock-modal">{children}</div>;
}
