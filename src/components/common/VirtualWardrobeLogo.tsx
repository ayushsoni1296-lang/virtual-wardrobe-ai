import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export const VirtualWardrobeLogo: React.FC<LogoProps> = ({
  className = '',
  size = 48,
  color = '#6366F1',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hook */}
      <path
        d="M32 10C35.3137 10 38 12.6863 38 16C38 18.8 36.08 21.16 33.5 21.84V25H30.5V21.84C27.92 21.16 26 18.8 26 16"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Hanger Body */}
      <path
        d="M32 25L10 39C8.34315 40.0544 8.78408 42.6 10.74 42.6H53.26C55.2159 42.6 55.6569 40.0544 54 39L32 25Z"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Bottom Bar */}
      <path
        d="M12 42.5H52"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
