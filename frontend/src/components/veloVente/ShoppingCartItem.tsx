import { AiOutlineDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useVeloVenteCart } from "@/context/VeloVenteCartContext";
import { useQuery } from "@tanstack/react-query";

const ShoppingCartItem = ({ id, initialQuantity }) => {
  const {
    addProductToCart,
    removeFromCart,
    decreaseItemQuantity,
    getItemQuantity,
  } = useVeloVenteCart();
  const quantity = getItemQuantity(id);

  const {
    data: item,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:4000/client/veloVentes/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch velo");
      }
      const result = await response.json();
      return result.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!item || !item.velo) return <p>No data available</p>;

  return (
    <div className="flex items-center p-4 border-b border-gray-200 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={item.velo.images[0]?.path}
        alt={item.velo.modele}
        className="w-24 h-24 object-cover rounded-md border border-gray-300 mr-4"
      />

      <div className="flex-grow">
        <h3 className="text-xl font-semibold mb-1 text-gray-800">
          {item.velo.modele} - {item.velo.marque.nom} -  -{" "}
          {item.velo.categorie.nom}
        </h3>
        <p className="text-gray-600 mb-1">Ref: {item.velo.ref}</p>
        <p className="text-gray-600 mb-1">Prix: {item.prix} TND</p>
        <p className="text-gray-800 font-semibold">
          Total: {item.prix * quantity} TND
        </p>
      </div>

      <div className="flex items-center ml-4 space-x-2">
        <button
          onClick={() => decreaseItemQuantity(id)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
          aria-label="Decrease quantity"
          disabled={quantity==1}
        >
          <AiOutlineMinus className="text-gray-800" />
        </button>
        <span className="text-lg font-medium text-gray-800">{quantity}</span>
        <button
          onClick={() => addProductToCart(id, 1,item.prix,item.stock)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
          aria-label="Increase quantity"
          disabled={quantity==item.stock}
        >
          <AiOutlinePlus className="text-gray-800" />
        </button>
      </div>

      <button
        onClick={() => removeFromCart(id)}
        className="ml-4 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200"
        aria-label="Remove item"
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
};

export default ShoppingCartItem;
