export default function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div>
        <img src={image} alt="Teljes méretű kép" className="max-w-4xl max-h-4xl rounded-lg" />
      </div>
    </div>
  );
}
