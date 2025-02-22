export default function Footer({ height = 64 }) {
  const classFooter = `bot-0 w-full bg-c-secondary-dark/30 flex justify-between relative h-${height} text-white`;
  const classImage = `mix-blend-screen object-cover w-full  absolute h-${height}`;

  return (
    <section className={classFooter}>
      <img className={classImage} src="/theatron_01.jpg" alt="footer-bg" />
      <div className="font-medium text-clip mx-auto my-5 w-2/3 flex justify-around gap-20 z-5 overflow-hidden">
        <div className="">
          <img
            src="Modified_Bt4th.svg"
            alt="BreakThe4th Logo"
            className="w-[50px] h-[50px] sm:w-[25px] sm:h-[25px] cursor-pointer hover:scale-110 transition-transform duration-100"
          />
          <p className="text-xl font-bold mb-4">BreatThe4th Inc.</p>
          <p>emailme@bt4th.hu.</p>
          <p> 6969 Valahol, Fiktív utca 10.</p>
          <p>+36 12 345 6789</p>
        </div>
        <div className="hidden tablet:block">
          <p className="text-xl mb-4">Kreátorok</p>
          <p>Anita</p>
          <p>Attila</p>
          <p>Bazsi</p>
          <p>László</p>
          <p>Tamás</p>
          <p>(Andris, Gergő)</p>
        </div>
        <div className="hidden laptop:block ">
          <p className="text-xl mb-4">Lorem</p>
          <p> Donec non nibh commodo, dignissim erat porttitor, consequat arcu.</p>
          <p> Vestibulum pharetra sem eget venenatis iaculis.</p>
          <p>Proin a metus sit amet risus semper dictum vitae non neque.</p>
          <p> Curabitur porta enim ac pharetra fermentum.</p>
        </div>
      </div>
    </section>
  );
}
