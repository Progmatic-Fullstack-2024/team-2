export default function Spinner({ size = 12, color = 'white' }) {
  return (
    <div
      className={`inline-block h-${size} w-${size} animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-${color}`}
      role="status"
    />
  );
}
