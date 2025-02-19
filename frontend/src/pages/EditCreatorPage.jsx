import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import EditCreatorForm from '../components/creators/EditCreatorForm.jsx'; // 🔹 Hivatkozás az EditCreatorForm-ra
import ImageTitle from '../components/misc/ImageTitle.jsx';
import creatorsService from '../services/creators.service.js';

export default function EditCreatorPage() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreator() {
      try {
        const fetchedCreator = await creatorsService.getCreatorById(id);
        setCreator(fetchedCreator);
      } catch (error) {
        toast.error('Hiba az alkotó betöltésekor:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCreator();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">🔄 Betöltés...</div>;
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        ❌ Nem található alkotó.
      </div>
    );
  }

  return (
    <>
      <ImageTitle
        title="Alkotó módosítása"
        description="Itt tudod szerkeszteni az alkotó adatait"
      />
      <div className="min-h-screen flex flex-col items-center">
        <EditCreatorForm creator={creator} /> {/* 🔹 Az adatok továbbadása a szerkesztő formnak */}
      </div>
    </>
  );
}
