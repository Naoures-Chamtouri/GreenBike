const handleAddToCart = () => {
  if (userLoggedIn) {
    console.log("Utilisateur connecté - Ajouter au panier côté serveur");
    // Appeler votre API pour ajouter au panier côté serveur
  } else {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(velo);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Utilisateur non connecté - Ajouter au panier localement");
  }
};
