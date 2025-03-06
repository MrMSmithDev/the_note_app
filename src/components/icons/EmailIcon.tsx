import IconProps from 'src/types/IconProps';

const EmailIcon: React.FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      data-testid="email-icon"
      className={className}
      viewBox="0 -2.5 20 20"
      version="1.1"
      fill="#156CFF"
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-340.000000, -922.000000)" fill="#C8C8C9">
            <g transform="translate(56.000000, 160.000000)">
              <path d="M294,774.474 L284,765.649 L284,777 L304,777 L304,765.649 L294,774.474 Z M294.001,771.812 L284,762.981 L284,762 L304,762 L304,762.981 L294.001,771.812 Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default EmailIcon;
