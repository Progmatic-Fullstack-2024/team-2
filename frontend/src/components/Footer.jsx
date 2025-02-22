import SvgIcon from './misc/SvgIcon';

export default function Footer({ height = 70 }) {
  const classFooter = `bot-0 w-full flex justify-between relative h-${height} text-white`;
  const classImage = `mix-blend-screen object-cover w-full  absolute h-${height}`;

  return (
    <section className={`${classFooter} relative overflow-hidden`}>
      {/* 🔹 Háttérkép */}
      <img
        className={`${classImage} absolute inset-0 w-full h-full object-cover`}
        src="/B2.png"
        alt="footer-bg"
      />

      {/* 🔹 Lábléc tartalma */}
      <div className="relative font-medium text-clip mx-auto my-5 w-3/4 flex flex-col tablet:flex-row justify-between items-start gap-10 z-10 p-8 rounded-lg shadow-xl">
        {/* 📌 Céginformációk */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <SvgIcon icon="masks" size={50} className="text-c-primary-dark" />
            <h2 className="text-2xl font-bold text-c-primary-dark">BreakThe4th</h2>
          </div>
          <p className="text-white">viktor.balazs.endre@gmail.com</p>
          <p className="text-white">1071. Budapest, Dembinszky utca 10. 2/34</p>
          <p className="text-white font-semibold">+36 30 603 7498</p>
        </div>

        {/* 📌 Fejlesztők */}
        <div className="hidden tablet:flex-1 space-y-2 tablet:block">
          <h3 className="text-xl font-semibold text-c-primary">Fejlesztők</h3>
          <ul className="space-y-1">
            {['Nagy Mária Anita', 'Szebeni Attila', 'Viktor Balázs', 'Péterfi László', 'Molnár Tamás'].map(
              (dev, index) => (
                <li
                  key={index}
                  className="text-white hover:text-c-primary transition-all duration-300"
                >
                  {dev}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* 📌 Lorem Ipsum szöveg */}
        <div className="hidden laptop:flex-1 space-y-2 laptop:block">
          <h3 className="text-xl font-semibold text-c-primary-dark">A BT4TH-ról</h3>
          <p className="text-white">5 kezdő fejlesztő iskolai záró projektmunkájának indult.</p>
          <p className="text-white">Egy évvel az első februári demó után.</p>
          <p className="text-white">
            Budapest fővárosának támogatásával, már több, mint 3500 felhasználónk van.
          </p>
          <p className="text-white">
            S a számuk napról napra nő! Regisztráljatok, hadd virágozzon a független kúltúra!
          </p>
        </div>
      </div>
    </section>
  );
}
