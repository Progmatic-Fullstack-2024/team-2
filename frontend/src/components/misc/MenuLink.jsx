import { Link } from 'react-router-dom';

import SvgIcon from './SvgIcon';

export default function MenuLink({
  text = 'link',
  to,
  icon = null,
  iconSize = '20px',
  hoverColor = 'c-secondary-dark',
}) {
  return (
    <Link
      className={`h-full pe-1 tablet:px-2 flex items-center font-bold text-base hover:text-${hoverColor} cursor-pointer active:scale-95`}
      onClick={() => window.scrollTo(0, 0)}
      to={to}
    >
      {icon && (
        <SvgIcon
          icon={icon}
          className="laptop:hidden scale-75 "
          size={iconSize}
          hoverColor={hoverColor}
        />
      )}
      <span className={`${icon && 'hidden'} laptop:inline-block`}>{`${text.toUpperCase()}`}</span>
    </Link>
  );
}
