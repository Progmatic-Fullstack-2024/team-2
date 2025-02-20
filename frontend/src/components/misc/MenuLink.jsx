import { Link } from 'react-router-dom';

import SvgIcon from './SvgIcon';

export default function MenuLink({
  text = 'link',
  to,
  icon = '',
  iconSize = '50px',
  hoverColor = 'c-secondary-dark',
}) {
  return (
    <Link
      className={`h-full px-2 flex items-center font-bold text-base hover:text-${hoverColor} cursor-pointer active:scale-95`}
      onClick={() => window.scrollTo(0, 0)}
      to={to}
    >
      {icon && (
        <SvgIcon icon={icon} className="scale-75 tablet:scale-100 laptop:hidden" size={iconSize} hoverColor={hoverColor} />
      )}
      <span className={`${icon && 'hidden'} laptop:inline-block`}>{`${text.toUpperCase()}`}</span>
    </Link>
  );
}
