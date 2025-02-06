export default function OserSearch() {
  return (
    <div className="flex flex-row items-center ps-3 pointer-events-none">
      <input
        name="userSearch"
        className="outline-none block w-full h-9 ps-12 text-sm text-gray-900 border border-gray-400 rounded-s-xl outline:0 focus:ring-1 ring-c-primary  "
        placeholder="Felhasználó keresése..."
      />
      <button
        type="submit"
        className="py-2 px-5 bg-c-primary hover:bg-c-primary-light active:bg-c-primary-dark rounded-e-xl text-white font-semibold "
      >
        Keresés
      </button>
    </div>
  );
}
