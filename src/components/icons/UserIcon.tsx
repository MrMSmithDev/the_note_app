import IconProps from 'src/types/IconProps';

const UserIcon: React.FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      data-testid="user-icon"
      className={className}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
          fill="#C8C8C9"
        ></path>
        <path
          d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
          fill="#C8C8C9"
        ></path>
      </g>
    </svg>
  );
};

export default UserIcon;
