import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { useVeloContext } from "../../context/VeloContext";
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import DragComponent from "../../components/DragandDrop/DragComponent";
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Carousel from "../../components/carousel";

function PageVelo() {
  const navigate=useNavigate()
     const location = useLocation();
     const { velo } = location.state || {};
     const {categories,genres,ages,freins,selles,marques,couleurs}=useVeloContext();
   const [ownerLicense, setOwnerLicense] = useState([]);
   const [types,setTypes]=useState([])




      
const initialValues = {
        categorie: velo.velo.categorie?._id || {},
        type: velo.velo.type?._id || 'undefined',
        modele: velo.velo.modele || '',
        genre: velo.velo.genre._id || '',
        age: velo.velo.categorieAge._id || '',
        taille: velo.velo.taille || '',
        description: velo.velo.description || '',
        etat: velo.etat || '',
        prix: velo.prix || 0,
        duree: velo.duréeUtilisation || '',
        stock: velo.stock || 0,
        isPliable: velo.velo.pliable || false,
        suspension: velo.velo.suspension || '',
        vitesse: velo.velo.nbrVitesse || 0,
        roue: {
          materiau: velo.velo.roue?.materiau || '',
          taille: velo.velo.roue?.taille || '',
          poids: velo.velo.roue?.poids || '',
        },
        cadre: {
          materiau: velo.velo.cadre?.materiau || '',
          taille: velo.velo.cadre?.taille || '',
        },
        moteur: {
          type: velo.velo.moteur?.type || '',
          puissance: velo.velo.moteur?.puissance || '',
        },
        selle: velo.velo.selle._id || '',
        frein: velo.velo.frein._id || '',
        marque: velo.velo.marque._id || '',
        newMarque: '',
        selectedCouleurs:
          velo.velo.couleur?.map((couleur) => couleur._id) || [],
      };


      const [formValues,setFormValues]=useState(initialValues);
      const [isAddingMarque, setIsAddingMarque] = useState(false);
      
     const images=velo.velo.images.map((image) => image.path);
      const [disabled,setDisabled]=useState(true)


const [showPopover,setShowPopover]=useState(false)

const handleChange = (event) => {
  const { name, type, checked, value } = event.target;

  // Déterminer la valeur en fonction du type de champ
  const inputValue = type === 'checkbox' ? checked : value;

  // Fonction pour mettre à jour un champ imbriqué
  const updateNestedField = (path, inputValue) => {
    const keys = path.split('.'); // Pour gérer les champs imbriqués comme "roue.materiau"
    let updatedValues = { ...formValues }; // Copier formValues
    let field = updatedValues;

    // Parcourir les clés imbriquées pour trouver le champ correct
    for (let i = 0; i < keys.length - 1; i++) {
      if (!field[keys[i]]) field[keys[i]] = {}; // Créer les objets imbriqués si nécessaire
      field = field[keys[i]];
    }

    field[keys[keys.length - 1]] = inputValue; // Mettre à jour la dernière clé

    setFormValues(updatedValues); // Mettre à jour l'état
  };

  // Appeler la fonction pour mettre à jour le champ
  updateNestedField(name, inputValue);
};
  const handleUpdate=async()=>{
  let formIsValid = true;
  
  
  
  if (!formValues.categorie) {
    formIsValid = false;
    console.log("La catégorie est obligatoire");
  }
  
  if (!formValues.type) {
    formIsValid = false;
    console.log("Le type est obligatoire");
  }

  if (!formValues.modele) {
    formIsValid = false;
    console.log("Le modèle est obligatoire");
  }

  if (!formValues.genre) {
    formIsValid = false;
    console.log("Le genre est obligatoire");
  }

  if (!formValues.age) {
    formIsValid = false;
    console.log("La catégorie d'âge est obligatoire");
  }

  if (!formValues.taille) {
    formIsValid = false;
    console.log("La taille est obligatoire");
  }

  if (!formValues.description) {
    formIsValid = false;
    console.log("La description est obligatoire");
  }

  if (!formValues.etat) {
    formIsValid = false;
    console.log("L'état est obligatoire");
  }

  if (formValues.prix <= 0) {
    formIsValid = false;
    console.log("Le prix doit être supérieur à 0");
  }

  if (!formValues.duree) {
    formIsValid = false;
    console.log("La durée est obligatoire");
  }

  if (formValues.stock <= 0) {
    formIsValid = false;
    console.log("Le stock doit être supérieur à 0");
  }

  if (!formValues.roue.materiau || !formValues.roue.taille || !formValues.roue.poids) {
    formIsValid = false;
    console.log("Tous les attributs de la roue sont obligatoires");
  }

  if (!formValues.cadre.materiau || !formValues.cadre.taille) {
    formIsValid = false;
    console.log("Tous les attributs du cadre sont obligatoires");
  }

 

  if (!formValues.selle) {
    formIsValid = false;
    console.log("Le matériau de la selle est obligatoire");
  }

  if (!formValues.frein) {
    formIsValid = false;
    console.log("Le type de frein est obligatoire");
  }

  if (!formValues.marque && !isAddingMarque) {
    formIsValid = false;
    console.log("La marque est obligatoire");
  }

  if (isAddingMarque && !formValues.newMarque) {
    formIsValid = false;
    console.log("Le champ nouvelle marque est obligatoire");
  }

  if (formValues.selectedCouleurs.length === 0) {
    formIsValid = false;
    console.log("Vous devez sélectionner au moins une couleur");
  }

  if(formIsValid){
    try{
const newVelo = {
  ...formValues,
    ownerLicense
    
  };
  console.log("newVelo :",newVelo)
 
 const response = await axios.put(
          `http://localhost:4000/admin/veloVentes/${velo._id}`,
        newVelo,
          {
            withCredentials: true,
          }
        );
        console.log("Modifiacation passée avec succès");
         setShowPopover(true);
        
          setTimeout(() => {
          setShowPopover(false)
            navigate('/VenteVelos/Velos');
            
         }, 2000);
         setDisabled(true);
       
       
         
       
      } catch (error) {
        console.error("Erreur lors de la modification:", error);
      }
    }else{
      alert("tout les champs son required")
    }
    }
 /* useEffect(() => {
   if (formValues.categorie != '') {
     axios
       .get(`http://localhost:4000/admin/types/${formValues.categorie}`)
       .then((response) => {
         setTypes(response.data.data);
       })
       .catch((error) => {});
   }
 }, [formValues.categorie]); */
 useEffect(() => {
  


  if(formValues.categorie.nom!="Vélos Electriques"){
  axios
    .get(`http://localhost:4000/admin/types/${formValues.categorie}`)
    .then((response) => {
      setTypes(response.data.data);
     
    
    })
    .catch((error) => {
    
    });}
     console.log(formValues);
}, [formValues.categorie]);
   const toggleAddMarque = () => {
     setIsAddingMarque(!isAddingMarque);
   };





  return (
    <div className="align-middle bg-slate-100 p-8 ">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-green-600 dark:text-white">
          Nouveau Velo
        </h2>

        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/VenteVelos">
                Vente des Velos /
              </Link>
            </li>
            <li className="font-medium text-green">Velos</li>
          </ol>

          {/* Bouton ajouté sous le lien */}
          <div className="mt-2">
            {disabled ? (
              <button
                className="px-4 ml-4 mt-3 py-2  text-green-600 border border-green-600 font-semibold rounded "
                onClick={() => {
                  setDisabled(false);
                }}
              >
                Mettre à jour
              </button>
            ) : (
              ''
            )}
          </div>
        </nav>
      </div>

      <div>
        {' '}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h1 className="text-3xl font-bold text-customgreen">
              General Info
            </h1>
          </AccordionSummary>
          <AccordionDetails className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center space-x-6 mb-10">
              {/* Categorie */}
              <FormControl
                className="w-1/3 "
                required={true}
                disabled={disabled}
              >
                <InputLabel
                  id="categorie-label"
                  sx={{
                    '&.Mui-focused': {
                      color: 'green',
                    },
                  }}
                >
                  Categorie
                </InputLabel>
                <Select
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                  }}
                  labelId="categorie-label"
                  id="categorie-select"
                  value={formValues.categorie}
                  name="categorie"
                  label="Categorie"
                  onChange={handleChange}
                >
                  {categories.map((categorie) => (
                    <MenuItem key={categorie._id} value={categorie._id}>
                      {categorie.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Type */}
              <FormControl className="w-1/3" disabled={disabled}>
                <InputLabel
                  id="type-label"
                  sx={{
                    '&.Mui-focused': {
                      color: 'green',
                    },
                  }}
                >
                  Type
                </InputLabel>
                <Select
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                  }}
                  labelId="type-label"
                  id="type-select"
                  value={formValues.type}
                  name="type"
                  label="Type"
                  onChange={handleChange}
                >
                  {types.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="flex justify-center space-x-6 mb-6">
              <FormControl className="w-1/3" disabled={disabled}>
                {isAddingMarque ? (
                  <TextField
                    label="Nouvelle Marque"
                    name="newMarque"
                    value={formValues.newMarque}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'green',
                        },
                      },
                    }}
                  />
                ) : (
                  <>
                    <InputLabel
                      id="marque-label"
                      sx={{
                        '&.Mui-focused': {
                          color: 'green',
                        },
                      }}
                    >
                      Marque
                    </InputLabel>
                    <Select
                      labelId="marque-label"
                      id="marque-select"
                      name="marque"
                      value={formValues.marque}
                      label="Marque"
                      onChange={handleChange}
                      sx={{
                        '& .MuiSelect-select': {
                          color: 'black',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'green',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'green',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'green',
                        },
                      }}
                    >
                      {marques.map((marque) => (
                        <MenuItem key={marque._id} value={marque._id}>
                          {marque.nom}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}

                {disabled ? (
                  ''
                ) : (
                  <IconButton
                    onClick={toggleAddMarque}
                    sx={{ ml: 2, color: 'green' }}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </FormControl>

              <FormControl className="w-1/3" disabled={disabled}>
                <InputLabel
                  id="couleurs-label"
                  sx={{
                    '&.Mui-focused': {
                      color: 'green',
                    },
                  }}
                >
                  Couleurs
                </InputLabel>
                <Select
                  labelId="couleurs-label"
                  id="couleurs-select"
                  multiple
                  name="selectedCouleurs"
                  value={formValues.selectedCouleurs}
                  onChange={handleChange}
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                  }}
                >
                  {couleurs.map((couleur) => (
                    <MenuItem key={couleur._id} value={couleur._id}>
                      {couleur.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="flex justify-center space-x-6 mb-6">
              {/* Modele */}
              <TextField
                disabled={disabled}
                sx={{
                  '& .MuiSelect-select': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                }}
                className="w-1/3"
                color="success"
                id="modele-input"
                label="Modele"
                variant="outlined"
                name="modele"
                value={formValues.modele}
                onChange={handleChange}
              />

              {/* Genre */}
              <FormControl className="w-1/3" disabled={disabled}>
                <InputLabel
                  id="genre-label"
                  sx={{
                    '&.Mui-focused': {
                      color: 'green',
                    },
                  }}
                >
                  Genre
                </InputLabel>
                <Select
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                  }}
                  labelId="genre-label"
                  id="genre-select"
                  name="genre"
                  value={formValues.genre}
                  label="Genre"
                  onChange={handleChange}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre._id} value={genre._id}>
                      {genre.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="flex justify-center space-x-6 mb-6">
              {/* Categorie Age */}
              <FormControl className="w-1/3" disabled={disabled}>
                <InputLabel
                  id="age-label"
                  sx={{
                    '&.Mui-focused': {
                      color: 'green',
                    },
                  }}
                >
                  Categorie Age
                </InputLabel>
                <Select
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                  }}
                  labelId="age-label"
                  id="age-select"
                  name="age"
                  value={formValues.age}
                  label="Categorie Age"
                  onChange={handleChange}
                >
                  {ages.map((age) => (
                    <MenuItem key={age._id} value={age._id}>
                      {age.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Taille */}
              <FormControl className="w-1/3" disabled={disabled}>
                <InputLabel
                  id="taille-label"
                  sx={{
                    '&.Mui-focused': {
                      color: 'green',
                    },
                  }}
                >
                  Taille
                </InputLabel>
                <Select
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                  }}
                  labelId="taille-label"
                  id="taille-select"
                  name="taille"
                  value={formValues.taille}
                  label="Taille"
                  onChange={handleChange}
                >
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="XXL">XXL</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="flex justify-center space-x-6 mb-6">
              {/* Price */}
              <TextField
                disabled={disabled}
                sx={{
                  '& .MuiSelect-select': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                }}
                className="w-1/3"
                color="success"
                id="prix-input"
                type="number"
                label="Prix"
                variant="outlined"
                name="prix"
                value={formValues.prix}
                onChange={handleChange}
              />

              {/* Stock */}
              <TextField
                disabled={disabled}
                sx={{
                  '& .MuiSelect-select': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                }}
                className="w-1/3"
                color="success"
                id="stock-input"
                type="number"
                label="Stock"
                variant="outlined"
                name="stock"
                value={formValues.stock}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-center space-x-6 mb-6">
              {/* Description */}
              <TextField
                disabled={disabled}
                sx={{
                  '& .MuiSelect-select': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                }}
                className="w-2/3"
                color="success"
                id="description-input"
                label="Description"
                variant="outlined"
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-center space-x-6 mb-6">
              {/* Etat */}
              <FormControl className="w-1/3" disabled={disabled}>
                <InputLabel
                  id="etat-label"
                  sx={{
                    '&.Mui-focused': {
                      color: 'green',
                    },
                  }}
                >
                  Etat
                </InputLabel>
                <Select
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                  }}
                  labelId="etat-label"
                  id="etat-select"
                  name="etat"
                  value={formValues.etat}
                  label="Etat"
                  onChange={handleChange}
                >
                  <MenuItem value="Bon">Bon</MenuItem>
                  <MenuItem value="Moyen">Moyen</MenuItem>
                  <MenuItem value="Mauvais">Mauvais</MenuItem>
                </Select>
              </FormControl>

              {/* Usage Duration */}
              <TextField
                disabled={disabled}
                sx={{
                  '& .MuiSelect-select': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                }}
                className="w-1/3"
                color="success"
                id="duree-input"
                label="Durée d'utilisation/mois"
                variant="outlined"
                name="duree"
                value={formValues.duree}
                onChange={handleChange}
              />
            </div>
            {disabled ? (
              <div className="py-4 px-4">
                <span className="text-xl font-bold ml-4">Images</span>
                <Carousel images={images} />
              </div>
            ) : (
              <div className="flex justify-center items-center px-5 ">
                <Carousel images={images} />
                <DragComponent
                  ownerLicense={ownerLicense}
                  setOwnerLicense={setOwnerLicense}
                />
              </div>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion expanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h1 className="text-3xl font-bold text-customgreen">
              Caracteristiques
            </h1>
          </AccordionSummary>
          <AccordionDetails className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-center space-x-6 mb-6">
              <TextField
                sx={{
                  '& .MuiSelect-select': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                }}
                disabled={disabled}
                className="w-1/3"
                color="success"
                id="vitesse-input"
                label="Nombre Vitesse"
                variant="outlined"
                name="vitesse"
                value={formValues.vitesse}
                onChange={handleChange}
              />

              {/* Suspension */}
              <TextField
                disabled={disabled}
                sx={{
                  '& .MuiSelect-select': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  },
                }}
                className="w-1/3"
                color="success"
                id="suspension-input"
                label="Suspension/mm"
                variant="outlined"
                name="suspension"
                value={formValues.suspension}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <div className="text-xl mb-3 font-bold">Roue</div>
              <div className="flex justify-center space-x-6 mb-6">
                <FormControl className="w-1/3" disabled={disabled}>
                  <InputLabel
                    id="materiau-roue-label"
                    sx={{
                      '&.Mui-focused': {
                        color: 'green',
                      },
                    }}
                  >
                    Materiau
                  </InputLabel>
                  <Select
                    sx={{
                      '& .MuiSelect-select': {
                        color: 'black',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                    }}
                    labelId="materiau-roue-label"
                    id="materiau-roue-select"
                    name="roue.materiau"
                    value={formValues.roue.materiau}
                    onChange={handleChange}
                  >
                    <MenuItem value="Aluminium">Aluminium</MenuItem>
                    <MenuItem value="Carbone">Carbone</MenuItem>
                    <MenuItem value="Acier">Acier</MenuItem>
                    <MenuItem value="Composite">Composite</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  disabled={disabled}
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                  }}
                  className="w-1/3"
                  color="success"
                  id="roue-taille-input"
                  label="Taille/pouce"
                  variant="outlined"
                  name="roue.taille"
                  value={formValues.roue.taille}
                  onChange={handleChange}
                />
                <TextField
                  disabled={disabled}
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                  }}
                  className="w-1/3"
                  color="success"
                  id="poids-input"
                  label="Poids/kg"
                  variant="outlined"
                  name="roue.poids"
                  value={formValues.roue.poids}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="text-xl mb-3 font-bold">Cadre</div>
              <div className="flex justify-center space-x-6 mb-6">
                <FormControl className="w-1/3" disabled={disabled}>
                  <InputLabel
                    id="cadre-materiau-label"
                    sx={{
                      '&.Mui-focused': {
                        color: 'green',
                      },
                    }}
                  >
                    Materiau
                  </InputLabel>
                  <Select
                    sx={{
                      '& .MuiSelect-select': {
                        color: 'black',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                    }}
                    labelId="cadre-materiau-label"
                    id="cadre-materiau-select"
                    name="cadre.materiau"
                    value={formValues.cadre.materiau}
                    onChange={handleChange}
                  >
                    <MenuItem value="Aluminium">Aluminium</MenuItem>
                    <MenuItem value="Carbone">Carbone</MenuItem>
                    <MenuItem value="Acier">Acier</MenuItem>
                    <MenuItem value="Composite">Composite</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  disabled={disabled}
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'black',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'green',
                    },
                  }}
                  className="w-1/3"
                  color="success"
                  id="cadre-taille-input"
                  label="Taille du Cadre/cm"
                  variant="outlined"
                  name="cadre.taille"
                  value={formValues.cadre.taille}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="text-xl mb-3 font-bold">Selle</div>
              <div className="flex justify-center space-x-6 mb-6">
                <FormControl className="w-1/3" disabled={disabled}>
                  <InputLabel
                    id="frein-label"
                    sx={{
                      '&.Mui-focused': {
                        color: 'green',
                      },
                    }}
                  >
                    materiau
                  </InputLabel>
                  <Select
                    sx={{
                      '& .MuiSelect-select': {
                        color: 'black',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                    }}
                    labelId="frein-label"
                    id="frein-select"
                    name="selle"
                    value={formValues.selle}
                    onChange={handleChange}
                  >
                    {selles.map((selle) => (
                      <MenuItem key={selle._id} value={selle._id}>
                        {selle.materiau}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div>
              <div className="text-xl mb-3 font-bold">Frein</div>

              <div className="flex justify-center space-x-6 mb-6">
                <FormControl className="w-1/3" disabled={disabled}>
                  <InputLabel
                    id="frein-label"
                    sx={{
                      '&.Mui-focused': {
                        color: 'green',
                      },
                    }}
                  >
                    Type de Frein
                  </InputLabel>
                  <Select
                    sx={{
                      '& .MuiSelect-select': {
                        color: 'black',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'green',
                      },
                    }}
                    labelId="frein-label"
                    id="frein-select"
                    name="frein"
                    value={formValues.frein}
                    onChange={handleChange}
                  >
                    {freins.map((frein) => (
                      <MenuItem key={frein._id} value={frein._id}>
                        {frein.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div>
              {formValues.categorie == '66b9e84c0ad7a738f5cfe402' && (
                <div>
                  <div className="text-xl mb-3 font-bold">Moteur</div>
                  <div className="flex justify-center space-x-6 mb-6">
                    <FormControl className="w-1/3" disabled={disabled}>
                      <InputLabel
                        id="frein-label"
                        sx={{
                          '&.Mui-focused': {
                            color: 'green',
                          },
                        }}
                      >
                        Type
                      </InputLabel>
                      <Select
                        sx={{
                          '& .MuiSelect-select': {
                            color: 'black',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'green',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'green',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'green',
                          },
                        }}
                        labelId="moteur-label"
                        id="moteur=select"
                        name="moteur.type"
                        value={formValues.moteur.type}
                        onChange={handleChange}
                      >
                        <MenuItem value="Moteurs de course">
                          Moteurs de course
                        </MenuItem>
                        <MenuItem value="Moteurs sans balais">
                          Moteurs sans balais
                        </MenuItem>
                        <MenuItem value="Moteurs à moyeu">
                          Moteurs à moyeu
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      sx={{
                        '& .MuiSelect-select': {
                          color: 'black',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'green',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'green',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'green',
                        },
                      }}
                      className="w-1/3"
                      color="success"
                      disabled={disabled}
                      id="puissance"
                      label="puissance"
                      variant="outlined"
                      name="moteur.puissance"
                      value={formValues.moteur.puissance}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              <div>
                <div className="flex justify-center space-x-6 mb-6">
                  <label
                    htmlFor="checkboxLabelTwo"
                    className="flex cursor-pointer select-none items-center"
                  >
                    <div className="relative">
                      <input
                        disabled={disabled}
                        type="checkbox"
                        id="checkboxLabelTwo"
                        className="sr-only"
                        name="isPliable"
                        value={!formValues.isPliable}
                        onChange={handleChange}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          formValues.isPliable &&
                          'border-green bg-gray dark:bg-transparent'
                        }`}
                      >
                        <span
                          className={`opacity-0 ${
                            formValues.isPliable && '!opacity-100'
                          }`}
                        >
                          <svg
                            width="15"
                            height="10"
                            color="#008000"
                            viewBox="0 0 11 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                              fill="#008000"
                              stroke="#008000"
                              strokeWidth="0.4"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <h2 className="text-lg font-bold">Pliable</h2>
                  </label>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        {disabled ? (
          ''
        ) : (
          <div className="flex justify-end  mt-4">
            <div className="mr-7">
              <Button
                variant="contained"
                className="w-30 h-12 text-3xl "
                color="error"
                onClick={() => {
                  setDisabled(true);
                  setFormValues(initialValues);
                }}
              >
                Annuler
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                className="w-30 h-12 text-3xl "
                color="success"
                onClick={handleUpdate}
              >
                Valider
              </Button>
            </div>
          </div>
        )}
      </div>
      {showPopover && (
        <div className="fixed top-25 right-4 p-4 bg-green-400 text-white rounded shadow-lg">
          mise a Jour Avec succes !
        </div>
      )}
    </div>
  );
}

export default PageVelo
