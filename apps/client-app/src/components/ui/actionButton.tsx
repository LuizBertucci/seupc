import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

interface IActionButtonProps {
  icon: FontAwesomeIconProps['icon'];
  background?: string;
  iconSize?: number;
  width?: string;
  height?: string;
  disabled?: boolean;
}

export default function ActionButton({
  icon,
  background = 'primary',
  iconSize = 12,
  width = '28px',
  height = '28px',
  disabled = false,
  ...props
}: IActionButtonProps) {
  const disabledClass = disabled ? `bg-${background} disabled:opacity-50 cursor-not-allowed` : `bg-${background}`;

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
