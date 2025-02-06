import { Link } from 'react-router-dom';

import SvgIcon from './SvgIcon';

export default function MenuLink({ text = 'link', to, icon = '', iconSize = '50px' }) {
  return (
    <Link
      className="px-2 flex items-center font-bold text-base hover:underline h-full hover:drop-shadow-[0_0_10px_rgba(100,255,100,1)] cursor-pointer"
      onClick={() => window.scrollTo(0, 0)}
      to={to}
    >
      {icon && <SvgIcon icon={icon} className="laptop:hidden" stroke="white" size={iconSize} />}
      <span className={`${icon && 'hidden'} laptop:inline-block`}>{`${text.toUpperCase()}`}</span>
    </Link>
  );
}
