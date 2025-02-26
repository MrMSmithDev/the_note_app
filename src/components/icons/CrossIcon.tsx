import React from 'react';
import IconProps from 'src/types/IconProps';

interface CrossIconProps extends IconProps {
  fill?: string;
}

const CrossIcon: React.FC<CrossIconProps> = ({
  className = '',
  fill = '#000000',
}) => {
  return (
    <svg
      data-testid="cross-icon"
      className={className}
      viewBox="0 0 25 25"
      version="1.1"
      fill={fill}
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g transform="translate(-469.000000, -1041.000000)" fill={fill}>
            <path
              d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48"
              id="cross"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default CrossIcon;
