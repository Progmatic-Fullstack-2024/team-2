import SvgIcon from './SvgIcon';

export default function DefaultButton({
  buttonStyle = 'block',
  color = 'c-primary',
  text = '',
  textColor = 'c-text',
  fontSize = 'ml',
  onClick,
  onClickParams,
  type = 'button',
  height = '12',
  width = 'auto',
  disabled = false,
  icon = '',
  iconSize = '50px',
}) {
  let currentClass = `group w-${width} h-${height} flex items-center gap-1 text-${fontSize} rounded font-bold py-2 px-2 laptop:px-5 transition-[scale, colors, opacity] duration-150  active:bg-${color}-dark `;
  if (buttonStyle === 'block') {
    currentClass += ` bg-${color} text-${textColor} hover:bg-${color}-light active:scale-95 `;
  } else if (buttonStyle === 'outline') {
    currentClass += ` text-${color} brightness-110  bg-c-background/40 rounded-full laptop:border-2 border-${color} hover:bg-${color} hover:text-${textColor} active:border-${color}-dark `;
  }

  const classDisabled = `w-${width} h-${height} bg-gray-500 text-${fontSize} text-${textColor} font-bold rounded p-3 pl-7 pr-7`;
  const icnColor = buttonStyle === 'block' ? textColor : `${color} hover:${textColor}`;

  return (
    <button
      disabled={disabled}
      className={disabled ? classDisabled : currentClass}
      onClick={() => (onClick ? onClick(onClickParams) : undefined)}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {icon && (
        <SvgIcon
          icon={icon}
          color={icnColor}
          className={` group-hover:stroke-${textColor} group-hover:fill-${textColor} transition-[scale, colors, opacity] duration-150`}
          size={iconSize}
        />
      )}

      <span className={`w-full ${icon && 'hidden'} overflow-hidden laptop:block `}>{text}</span>
    </button>
  );
}
