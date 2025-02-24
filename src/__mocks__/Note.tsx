import React from 'react';
import type { NoteProps } from '@components/Note/Note';

export default function Note({ date }: NoteProps) {
  return <div data-testid="mock-note">Mock Note for {date}</div>;
}
