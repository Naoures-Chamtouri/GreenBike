import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"


const veloContext=createContext({})

const VeloProvider=({children})=>{
     const [categories, setCategories] = useState([]);
  
     const [types, setTypes] = useState([]);
     const [marques, setMarques] = useState([]);
     const [couleurs,setCouleurs]=useState([]);
      const [genres, setGenres] = useState([]);
       const [ages, setAges] = useState([]);
       const [selles,setSelles]=useState([]);
       const [freins,setFreins]=useState([]);
     const [adresses,setAdresses]=useState([])


useEffect(() => {
  axios
    .get('http://localhost:4000/admin/categories')
    .then((response) => {
      setCategories(response.data.data);
     
    
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des categorie:', error);
    });
     axios
       .get('http://localhost:4000/admin/genres')
       .then((response) => {
         setGenres(response.data.data);
       })
       .catch((error) => {
         console.error('Erreur lors de la récupération des genres:', error);
       });

        axios
          .get('http://localhost:4000/admin/categoriesAge')
          .then((response) => {
            setAges(response.data.data);
          })
          .catch((error) => {
            console.error(
              'Erreur lors de la récupération des ages:',
              error,
            );
          });


          axios
            .get('http://localhost:4000/admin/selles')
            .then((response) => {
              setSelles(response.data.data);
            })
            .catch((error) => {
              console.error('Erreur lors de la récupération des selles:', error);
            });


        axios
          .get('http://localhost:4000/admin/freins')
          .then((response) => {
            setFreins(response.data.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des freins:', error);
          });
          

         axios
           .get('http://localhost:4000/admin/marques')
           .then((response) => {
             setMarques(response.data.data);
           })
           .catch((error) => {
             console.error('Erreur lors de la récupération des freins:', error);
           });

            axios
              .get('http://localhost:4000/admin/couleurs')
              .then((response) => {
                setCouleurs(response.data.data);
              })
              .catch((error) => {
                console.error(
                  'Erreur lors de la récupération des couleurs:',
                  error,
                );
              });

              axios
              .get('http://localhost:4000/admin/adresses')
              .then((response) => {
                setAdresses(response.data.data);
              })
              .catch((error) => {
                console.error(
                  'Erreur lors de la récupération des adresses',
                  error,
                );
              });
}, []);


    return(
        <veloContext.Provider value={{categories,setTypes,types,ages,genres,freins,selles,marques,couleurs,adresses}}>
            {children}
        </veloContext.Provider>
    )
}

export const useVeloContext=()=>{
    return useContext(veloContext)
}

export default VeloProvider;

