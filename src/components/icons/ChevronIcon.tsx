import React from 'react';
import IconProps from 'src/types/IconProps';

interface ChevronIconProps extends IconProps {
  fill?: string;
  inverted?: boolean;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({
  className = '',
  inverted = false,
}) => {
  return (
    <svg
      data-testid="chevron-icon"
      className={`${className} ${inverted ? 'rotate-180' : ''}`}
      height="200px"
      width="200px"
      viewBox="0 0 32 32"
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <g>
          <path d="M12.5,28c-1,0-1.8-0.4-2.5-1c-1.4-1.4-1.4-3.6,0-5l5.7-5.8c0.1-0.1,0.1-0.2,0-0.3L10,10.1c-1.4-1.4-1.4-3.6,0-5 c0.7-0.7,1.6-1,2.5-1c0,0,0,0,0,0c1,0,1.8,0.4,2.5,1l9.3,9.4c0.9,0.9,0.9,2.3,0,3.1l-9.3,9.4C14.4,27.6,13.5,28,12.5,28 C12.5,28,12.5,28,12.5,28z"></path>{' '}
        </g>
      </g>
    </svg>
  );
};

export default ChevronIcon;
