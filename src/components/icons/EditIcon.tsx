import React from 'react';
import IconProps from 'src/types/IconProps';

const EditIcon: React.FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      data-testid="edit-icon"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#ff0000"
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          opacity="0.15"
          d="M4 20H8L18 10L14 6L4 16V20Z"
          fill="#2b7fff"
        ></path>
        <path
          d="M18 10L21 7L17 3L14 6M18 10L8 20H4V16L14 6M18 10L14 6"
          stroke="#2b7fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

export default EditIcon;
