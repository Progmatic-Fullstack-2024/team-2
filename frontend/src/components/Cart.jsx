import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-4 mt-20">
      <h2 className="text-xl font-bold mb-4 text-white">Kosár tartalma</h2>
      {cart.length === 0 ? (
        <p className="text-white">A kosár üres.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300"
                onClick={() => removeFromCart(item.id)}
              >
                Eltávolítás
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
