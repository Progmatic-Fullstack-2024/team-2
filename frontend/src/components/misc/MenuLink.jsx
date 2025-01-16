import { Link } from 'react-router-dom';

export default function MenuLink({ text = 'Empty Link', to }) {
  return (
    <Link
      className="px-2 flex items-center font-semibold text-lg hover:underline h-full hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-point"
      to={to}
    >
      {`${text}`}
    </Link>
  );
}
