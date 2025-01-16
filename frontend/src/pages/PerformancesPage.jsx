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
            { id: 1, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 200 },
            { id: 2, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 2500 },
            { id: 3, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 250 },
            { id: 4, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 2500 },
            {
              id: 5,
              title: 'Perf64564 4 4ormance1',
              imgUrl: 'https://picsum.photos/307/402',
              price: 100,
            },
            { id: 6, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 500 },
            { id: 7, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 250 },
            {
              id: 8,
              title: 'Perfo r454646456  4man454ce1',
              imgUrl: 'https://picsum.photos/307/402',
              price: 2500,
            },
            { id: 9, title: 'Perfo4rmance1', imgUrl: 'https://picsum.photos/307/402', price: 250 },
            { id: 10, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 2500 },
            { id: 11, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 200 },
            { id: 12, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 20 },
            { id: 13, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 2500 },
            { id: 14, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 200 },
            {
              id: 15,
              title: 'Performandsad   dsadasd  asdace1',
              imgUrl: 'https://picsum.photos/307/402',
              price: 200,
            },
            { id: 16, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 500 },
            { id: 17, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 250 },
            { id: 18, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 200 },
            { id: 19, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 500 },
            { id: 20, title: 'Performance1', imgUrl: 'https://picsum.photos/307/402', price: 250 },
          ]}
        />
      </div>
    </>
  );
}
