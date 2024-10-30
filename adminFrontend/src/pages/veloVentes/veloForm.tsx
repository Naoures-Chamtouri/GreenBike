import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, FormHelperText, IconButton, InputLabel,  MenuItem, Select, selectClasses, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useVeloContext } from "../../context/VeloContext";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DragComponent from "../../components/DragandDrop/DragComponent";


function VeloForm() {


 
 const {categories,genres,ages,freins,selles,marques,couleurs}=useVeloContext();
   const [ownerLicense, setOwnerLicense] = useState([]);
   const [types,setTypes]=useState([])
   const [errors, setErrors] = useState({});

   const initialValues = {
     categorie: '',
     type: '',
     modele: '',
     marque: '',
     genre: '',
     age: '',
     taille: '',
     description: '',
     etat: '',
     prix: 0,
     stock:0,
     duree: '',
     isPliable: false,
     suspension: '',
     vitesse: 0,
     roue: { materiau: '', taille: '', poids: '' },
     cadre: { materiau: '', taille: '' },
     moteur: {
       type: '',
       puissance: '',
     },
     frein:'',
     selle:'',
     newMarque:'',
     selectedCouleurs:[]
   };
   const [formValues,setFormValues]=useState(initialValues)

  
  
 
 
 
   
      const [isAddingMarque, setIsAddingMarque] = useState(false);
    
      console.log(formValues.categorie)


const [showPopover,setShowPopover]=useState(false)
  const handleSubmit=async()=>{

     let formIsValid = true;
  console.log(formValues)
  
  
  if (!formValues.categorie) {
    formIsValid = false;
    console.log("La catégorie est obligatoire");
  }
  
  if (!formValues.type && formValues.categorie == '66b9e84c0ad7a738f5cfe402') {
    formIsValid = false;
    console.log('Le type est obligatoire');
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

  if (formIsValid) {
    try {
      const velo = {
        ...formValues,
        ownerLicense,
      };
      console.log(velo);
      const response = await axios.post(
        'http://localhost:4000/admin/veloVentes',
        velo,
        {
          withCredentials: true,
        },
      );
      console.log('Ajout de velo avec succès:', response.data);
      setShowPopover(true);
      setTimeout(() => {
        setShowPopover(false);
      }, 2000);
      setFormValues(initialValues);
    } catch (error) {
      console.error('Erreur lors du passage de la commande:', error);
    }
  } else {
    alert('tout les champs son required');
  }
    }


const handleChange = (event) => {
  const { name, value } = event.target;

  // Fonction pour mettre à jour un champ imbriqué
  const updateNestedField = (path, value) => {
    const keys = path.split('.'); // Split by '.' to handle nested fields like "roue.materiau"
    let updatedValues = { ...formValues }; // Create a copy of formValues
    let field = updatedValues;

    // Parcourir les clés imbriquées pour mettre à jour la valeur correcte
    for (let i = 0; i < keys.length - 1; i++) {
      field = field[keys[i]];
    }

    field[keys[keys.length - 1]] = value; // Mettre à jour la clé finale

    setFormValues(updatedValues); // Mettre à jour l'état
  };

  updateNestedField(name, value);
};

 useEffect(() => {
  if(formValues.categorie!=''){
  axios
    .get(`http://localhost:4000/admin/types/${formValues.categorie._id}`)
    .then((response) => {
      setTypes(response.data.data);
     
    
    })
    .catch((error) => {
    
    });}
}, [formValues.categorie]);

  /*Carateristiques */
 

   const toggleAddMarque = () => {
     setIsAddingMarque(!isAddingMarque);
   };
  
  return (
    <div className="align-middle bg-slate-100 p-8">
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
        </nav>
      </div>
      {/* General Info Section */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h1 className="text-3xl font-bold text-customgreen">General Info</h1>
        </AccordionSummary>
        <AccordionDetails className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center space-x-6 mb-6">
            {/* Categorie */}
            <FormControl className="w-1/3" required={true}>
              <InputLabel
                id="categorie-label"
                sx={{ '&.Mui-focused': { color: 'green' } }}
              >
                Categorie
              </InputLabel>
              <Select
                labelId="categorie-label"
                id="categorie-select"
                name="categorie"
                value={formValues.categorie}
                label="Categorie"
                onChange={handleChange}
                sx={selectStyles}
              >
                {categories.map((categorie) => (
                  <MenuItem key={categorie._id} value={categorie}>
                    {categorie.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Type */}
            <FormControl className="w-1/3">
              <InputLabel
                id="type-label"
                sx={{ '&.Mui-focused': { color: 'green' } }}
              >
                Type
              </InputLabel>
              <Select
                labelId="type-label"
                id="type-select"
                name="type"
                value={formValues.type}
                label="Type"
                onChange={handleChange}
                sx={selectStyles}
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
            <FormControl className="w-1/3">
              {isAddingMarque ? (
                <TextField
                  label="Nouvelle Marque"
                  name="newMarque"
                  value={formValues.newMarque}
                  onChange={handleChange}
                  sx={textFieldStyles}
                />
              ) : (
                <>
                  <InputLabel
                    id="marque-label"
                    sx={{ '&.Mui-focused': { color: 'green' } }}
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
                    sx={selectStyles}
                  >
                    {marques.map((marque) => (
                      <MenuItem key={marque._id} value={marque._id}>
                        {marque.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            </FormControl>

            <FormControl className="w-1/3">
              <InputLabel
                id="couleurs-label"
                sx={{ '&.Mui-focused': { color: 'green' } }}
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
                sx={selectStyles}
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
              className="w-1/3"
              color="success"
              id="modele-input"
              label="Modele"
              variant="outlined"
              name="modele"
              value={formValues.modele}
              onChange={handleChange}
              sx={textFieldStyles} // Reuse this for custom styles
            />

            {/* Genre */}
            <FormControl className="w-1/3">
              <InputLabel
                id="genre-label"
                sx={{ '&.Mui-focused': { color: 'green' } }}
              >
                Genre
              </InputLabel>
              <Select
                labelId="genre-label"
                id="genre-select"
                name="genre"
                value={formValues.genre}
                label="Genre"
                onChange={handleChange}
                sx={selectStyles} // Reuse this for custom styles
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
            <FormControl className="w-1/3" error={!!errors.age}>
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
                sx={selectStyles} // Reuse select styles for consistency
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
            <FormControl className="w-1/3">
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
                sx={selectStyles} // Consistent select styling
                labelId="taille-label"
                id="taille-select"
                name="taille"
                value={formValues.taille}
                label="Taille"
                onChange={handleChange}
              >
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
                <MenuItem value="XXL">XXL</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex justify-center space-x-6 mb-6">
            {/* Price */}
            <TextField
              sx={textFieldStyles} // Custom styles for consistency
              className="w-1/3"
              color="success"
              id="prix-input"
              type="number"
              label="Prix/DT"
              variant="outlined"
              name="prix"
              value={formValues.prix}
              onChange={handleChange}
            />

            {/* Stock */}
            <TextField
              sx={textFieldStyles}
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
              sx={textFieldStyles}
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
            <FormControl className="w-1/3">
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
                sx={selectStyles}
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
              sx={textFieldStyles}
              className="w-1/3"
              color="success"
              id="duree-input"
              label="Durée d'utilisation (annee/mois)"
              variant="outlined"
              name="duree"
              value={formValues.duree}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center items-center px-5 ">
            <DragComponent
              ownerLicense={ownerLicense}
              setOwnerLicense={setOwnerLicense}
            />
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Caracteristiques Section */}
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
              label="Suspension"
              variant="outlined"
              name="suspension"
              value={formValues.suspension}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <div className="text-xl mb-3 font-bold">Roue</div>
            <div className="flex justify-center space-x-6 mb-6">
              <FormControl className="w-1/3">
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
                label="Taille"
                variant="outlined"
                name="roue.taille"
                value={formValues.roue.taille}
                onChange={handleChange}
              />
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
                id="poids-input"
                label="Poids"
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
              <FormControl className="w-1/3">
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
                label="Taille du Cadre"
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
              <FormControl className="w-1/3">
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
              <FormControl className="w-1/3">
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
            {formValues.categorie._id == '66b9e84c0ad7a738f5cfe402' ? (
              <div>
                <div className="text-xl mb-3 font-bold">Moteur</div>
                <div className="flex justify-center space-x-6 mb-6">
                  <FormControl className="w-1/3">
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
                    id="puissance"
                    label="puissance"
                    variant="outlined"
                    name="moteur.puissance"
                    value={formValues.moteur.puissance}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div>
              <div className="flex justify-center space-x-6 mb-6">
                <label
                  htmlFor="checkboxLabelTwo"
                  className="flex cursor-pointer select-none items-center"
                >
                  <div className="relative">
                    <input
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
      <div className="flex justify-end mt-4">
        <Button
          variant="contained"
          className="w-30 h-12 text-3xl"
          color="success"
          onClick={handleSubmit}
        >
          Ajouter
        </Button>
      </div>
      {showPopover && (
        <div className="fixed top-25 right-4 p-4 bg-green-200 text-white rounded shadow-lg">
          vélo ajoutée avec succès !
        </div>
      )}
    </div>
  );
}
const selectStyles = {
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
};

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
};
export default VeloForm
