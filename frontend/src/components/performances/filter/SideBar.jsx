import MenuButton from './MenuButton';

export default function SideBar() {
  const categories = {
    Dátum: { data: [], type: '' },
    Ár: { data: ['2000 Ft alatt', '4000 Ft alatt', '6000 Ft alatt', 'Korlátlan'], type: 'radio' },
    Színház: { data: ['Nemzeti', 'Miskolci'], type: 'checkbox' },
    Alkotók: { data: [], type: '' },
    Régió: { data: [], type: '' },
  };
  return (
    <div className="min-w-48 h-fit flex flex-col gap-1 bg-c-primary/30 text-c-text mx-5 sticky top-24 rounded-lg overflow-hidden">
      {Object.keys(categories).map((key, value) => (
        <MenuButton title={key} menuItems={categories[key].data} type={categories[key].type} />
      ))}
    </div>
  );
}
