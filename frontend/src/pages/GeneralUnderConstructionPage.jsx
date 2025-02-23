import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import DefaultButton from '../components/misc/DefaultButton';

export default function GeneralUnderConstructionPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-c-background text-white text-center p-6">
      {/* Animált ikon */}
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-6xl mb-6"
      >
        🚧
      </motion.div>

      <h1 className="text-3xl font-bold mb-3">Fejlesztés alatt</h1>
      <p className="text-lg text-gray-300 max-w-lg">
        Ezen a funkción még dolgozunk! Nézz vissza később, vagy térj vissza a főoldalra.
      </p>

      {/* Vissza gomb */}
      <div className="mt-6">
        <DefaultButton text="Vissza" onClick={() => navigate(-1)} color="c-primary" />
      </div>
    </div>
  );
}
