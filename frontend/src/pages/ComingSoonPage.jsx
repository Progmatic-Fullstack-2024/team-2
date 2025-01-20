import React from 'react';
import { Link } from 'react-router-dom';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-c-secondary-light p-12">
      <h1 className="text-4xl font-bold text-c-primary mb-6">
        Az előadások hamarosan elérhetőek lesznek!
      </h1>
      <p className="text-xl text-gray-700 mb-6">
        Dolgozunk rajta, hogy a legjobb előadásokat kínálhassuk számodra. Kérlek, látogass vissza
        később.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/signedIn" className="text-c-primary text-lg font-semibold hover:underline">
          Vissza a kezdőlapra
        </Link>
        <Link to="/new-performance" className="text-c-primary text-lg font-semibold hover:underline">
          Új előadás hozzáadása
        </Link>
        <Link to="/performances" className="text-c-primary text-lg font-semibold hover:underline">
          Előadások megtekintése (ha elérhető)
        </Link>
      </div>
    </div>
  );
}
