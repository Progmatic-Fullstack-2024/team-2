import ImageTitle from '../components/misc/ImageTitle';
import PerformancesList from '../components/performances/PerformancesList';

export default function PerformancesPage() {
  return (
    <>
      <ImageTitle
        title="Előadások"
        description="Keress könnyedén és gyorsan az előadások között, hogy megtaláláld a számodra legalkalmasabbat!"
      />
      <div className="min-h-screen w-full flex flex-col items-center tablet:px-5 laptop:px-20">
        <PerformancesList
          performances={[
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 200 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 2500 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 250 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 2500 },
            { title: 'Perf64564 4 4ormance1', imgUrl: 'https://picsum.photos/307/402', price: 100 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 500 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 250 },
            {
              title: 'Perfo r454646456  4man454ce1',
              imgUrl: 'https://picsum.photos/307/402',
              price: 2500,
            },
            { title: 'Perfo4rmance1', imgUrl: 'https://picsum.photos/307/402', price: 250 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 2500 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 200 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 20 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 2500 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 200 },
            {
              title: 'Performandsad   dsadasd  asdace1',
              imgUrl: 'https://picsum.photos/307/402',
              price: 200,
            },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 500 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 250 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 200 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 500 },
            { title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 250 },
          ]}
        />
      </div>
    </>
  );
}
