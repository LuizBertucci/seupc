import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ActionButtonProps {
  icon: any;
  background?: string;
  iconSize?: number;
  width?: string;
  height?: string;
  disabled?: boolean;
}

export default function ActionButton({ 
  icon, 
  background = "primary", 
  iconSize = 12, 
  width = "28px", 
  height = "28px",
  disabled = false, 
  ...props 
}: ActionButtonProps) {
  const disabledClass = disabled ? 'bg-gray-400 cursor-not-allowed' : `bg-${background}`;

  return (
    <button
      type="button"
      {...props}
      disabled={disabled}
      className={`flex flex-col justify-center items-center ${disabledClass} rounded-full p-1 w-[${width}] h-[${height}] hover:shadow-md hover:translate-y-[-1px] transition-all duration-150`}
    >
      <FontAwesomeIcon icon={icon} color="white" width={iconSize} height={iconSize} />
    </button>
  );
}