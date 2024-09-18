// Fonction pour récupérer la valeur d'un cookie par son nom
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};


const isUserLoggedIn = () => {
  const token = getCookie("token"); 
  return Boolean(token);
};

export default {isUserLoggedIn}