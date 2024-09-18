const generateNumericId = () => {
  // Utiliser la méthode Date.now() pour obtenir un nombre basé sur le temps actuel
  // Cela aide à garantir que les IDs sont uniques
  const timestamp = Date.now();

  // Générer un nombre aléatoire pour ajouter une certaine variabilité
  const randomComponent = Math.floor(Math.random() * 1000); // Un nombre aléatoire entre 0 et 999

  // Combiner le timestamp et le composant aléatoire pour obtenir un ID numérique
  return timestamp * 1000 + randomComponent; // Cela donne un ID numérique unique
};

export default generateNumericId;
