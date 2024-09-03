import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Categories({ titre, onCategoryChange }) {
  // État pour stocker la catégorie sélectionnée
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/client/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const result = await response.json();
      return result.data;
    },
  });

  if (isLoading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data || data.length === 0) return <p>Aucune catégorie trouvée.</p>;

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mt-10 mb-6">{titre}</h1>
      <div className="flex flex-wrap justify-center space-x-5">
        {data.map((category) => (
          <button
            key={category._id}
            className={`py-2 px-4 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-300 
              ${
                selectedCategoryId === category._id
                  ? "border-2 border-customGreen" // Style pour la catégorie sélectionnée
                  : "border hover:border-customGreen"
              }`}
            onClick={() => {
              // Mettre à jour la catégorie sélectionnée
              setSelectedCategoryId(category._id);
              onCategoryChange({ id: category._id, name: category.nom });
            }}
          >
            {category.nom}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
