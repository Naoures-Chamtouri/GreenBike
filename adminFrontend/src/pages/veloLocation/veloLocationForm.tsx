import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useVeloContext } from '../../context/VeloContext';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DragComponent from '../../components/DragandDrop/DragComponent';

function VeloLocationForm() {
  const {
    categories,
    setTypes,
    types,
    genres,
    ages,
    freins,
    selles,
    marques,
    couleurs,
    adresses
  } = useVeloContext();
  const [ownerLicense, setOwnerLicense] = useState([]);
  const [categorie, setCategorie] = useState({});
  const [type, setType] = useState('');
  const [modele, setModele] = useState('');
  const [genre, setGenre] = useState('');
  const [age, setAge] = useState('');
  const [taille, setTaille] = useState('');
  const [description, setDescription] = useState('');
  
  const [prix, setPrix] = useState(0);

  const [stock, setStock] = useState(0);
  const [isPliable, setPliable] = useState(false);
  const [suspension, setSuspension] = useState('');
  const [vitesse, setVitesse] = useState(0);
  const [adresseDisponible,setAdresseDisponible]=useState([])
  const [roue, setRoue] = useState({
    materiau: '',
    taille: '',
    poids: '',
  });
  const [cadre, setCadre] = useState({
    materiau: '',
    taille: '',
  });
  const [moteur, setMoteur] = useState({
    type: '',
    puissance: '',
  });
  const [selle, setSelle] = useState({
    materiau: '',
  });
  const [frein, setFrein] = useState({
    type: '',
  });
  const [marque, setMarque] = useState('');
  const [isAddingMarque, setIsAddingMarque] = useState(false);
  const [newMarque, setNewMarque] = useState('');
  const [selectedCouleurs, setSelectedCouleurs] = useState([]);

  const [showPopover, setShowPopover] = useState(false);
  const handleSubmit = async () => {
    let formIsValid = true;

    // Validation de tous les champs
    if (!categorie) {
      formIsValid = false;
      console.log('La catégorie est obligatoire');
    }

    if (!type) {
      formIsValid = false;
      console.log('Le type est obligatoire');
    }

    if (!modele) {
      formIsValid = false;
      console.log('Le modèle est obligatoire');
    }

    if (!genre) {
      formIsValid = false;
      console.log('Le genre est obligatoire');
    }

    if (!age) {
      formIsValid = false;
      console.log("La catégorie d'âge est obligatoire");
    }

    if (!taille) {
      formIsValid = false;
      console.log('La taille est obligatoire');
    }

    if (!description) {
      formIsValid = false;
      console.log('La description est obligatoire');
    }

    if (!adresseDisponible) {
      formIsValid = false;
      console.log("L'état est obligatoire");
    }

    if (prix <= 0) {
      formIsValid = false;
      console.log('Le prix doit être supérieur à 0');
    }

  

    if (stock <= 0) {
      formIsValid = false;
      console.log('Le stock doit être supérieur à 0');
    }

    if (!roue.materiau || !roue.taille || !roue.poids) {
      formIsValid = false;
      console.log('Tous les attributs de la roue sont obligatoires');
    }

    if (!cadre.materiau || !cadre.taille) {
      formIsValid = false;
      console.log('Tous les attributs du cadre sont obligatoires');
    }

    if (!selle.materiau) {
      formIsValid = false;
      console.log('Le matériau de la selle est obligatoire');
    }

    if (!frein.type) {
      formIsValid = false;
      console.log('Le type de frein est obligatoire');
    }

    if (!marque && !isAddingMarque) {
      formIsValid = false;
      console.log('La marque est obligatoire');
    }

    if (isAddingMarque && !newMarque) {
      formIsValid = false;
      console.log('Le champ nouvelle marque est obligatoire');
    }

    if (selectedCouleurs.length === 0) {
      formIsValid = false;
      console.log('Vous devez sélectionner au moins une couleur');
    }

    if (formIsValid) {
      try {
        const velo = {
          categorie,
          type,
          modele,
          genre,
          age,
          taille,
          description,
         
          prix,
          
          stock,
          isPliable,
          suspension,
          vitesse,
          roue,
          cadre,
          moteur,
          selle: selle.materiau,
          frein: frein.type,
          ownerLicense,
          selectedCouleurs,
          marque,
          newMarque,
          adresseDisponible
        };
        
        const response = await axios.post(
          'http://localhost:4000/admin/veloLocations',
          velo,
          {
            withCredentials: true,
          },
        );
      
        setShowPopover(true);
        setTimeout(() => {
          setShowPopover(false);
        }, 2000);
        setCategorie({});
        setType('');
        setModele('');
        setGenre('');
        setAge('');
        setTaille('');
        setDescription('');
        setPrix(0);
        setStock(0);
        setPliable(false);
        setSuspension('');
        setVitesse(0);
        setRoue({
          materiau: '',
          taille: '',
          poids: '',
        });
        setCadre({
          materiau: '',
          taille: '',
        });
        setMoteur({
          type: '',
          puissance: '',
        });
        setSelle({ materiau: '' });
        setFrein({
          type: '',
        });
        setSelectedCouleurs([]);
        setMarque('');
        setNewMarque('');
        setAdresseDisponible([])
      } catch (error) {
        console.error('Erreur lors du passage de la commande:', error);
      }
    } else {
      alert('tout les champs son required');
    }
  };

  useEffect(() => {
    if (categorie != '') {
      axios
        .get(`http://localhost:4000/admin/types/${categorie._id}`)
        .then((response) => {
          setTypes(response.data.data);
        })
        .catch((error) => {});
    }
  }, [categorie]);

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
            <li className="font-medium text-primary">Velos</li>
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
            <FormControl className="w-1/3 " required={true}>
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
                    color: 'green',
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
                value={categorie}
                label="Categorie"
                onChange={(event) => setCategorie(event.target.value)}
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
                    color: 'green',
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
                value={type}
                label="Type"
                onChange={(event) => setType(event.target.value)}
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
            {/* Marque */}
            <FormControl className="w-1/3">
              {isAddingMarque ? (
                // TextField for adding new marque
                <TextField
                  label="Nouvelle Marque"
                  value={newMarque}
                  onChange={(e) => setNewMarque(e.target.value)}
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
                    value={marque}
                    label="Marque"
                    onChange={(event) => {
                      setMarque(event.target.value);
                    }}
                    sx={{
                      '& .MuiSelect-select': {
                        color: 'green',
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

              <IconButton
                onClick={toggleAddMarque}
                sx={{ ml: 2, color: 'green' }}
              >
                <AddIcon />
              </IconButton>
            </FormControl>

            {/* Couleurs */}
            <FormControl className="w-1/3">
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
                value={selectedCouleurs}
                onChange={(event) => {
                  setSelectedCouleurs(event.target.value);
                }}
                sx={{
                  '& .MuiSelect-select': {
                    color: 'green',
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
              sx={{
                '& .MuiSelect-select': {
                  color: 'green',
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
              value={modele}
              onChange={(event) => setModele(event.target.value)}
            />

            {/* Genre */}
            <FormControl className="w-1/3">
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
                    color: 'green',
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
                value={genre}
                label="Genre"
                onChange={(event) => setGenre(event.target.value)}
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
            <FormControl className="w-1/3">
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
                    color: 'green',
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
                value={age}
                label="Categorie Age"
                onChange={(event) => setAge(event.target.value)}
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
                sx={{
                  '& .MuiSelect-select': {
                    color: 'green',
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
                value={taille}
                label="Taille"
                onChange={(event) => setTaille(event.target.value)}
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
              sx={{
                '& .MuiSelect-select': {
                  color: 'green',
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
              label="Prix/Heure"
              variant="outlined"
              value={prix}
              onChange={(event) => setPrix(event.target.value)}
            />

            {/* Stock */}
            <TextField
              sx={{
                '& .MuiSelect-select': {
                  color: 'green',
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
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <FormControl className="w-1/3">
              <InputLabel
                id="couleurs-label"
                sx={{
                  '&.Mui-focused': {
                    color: 'green',
                  },
                }}
              >
                Addresse Disponible
              </InputLabel>
              <Select
                labelId="addresse-label"
                id="addresse-select"
                multiple
                value={adresseDisponible}
                onChange={(event) => {
                  setAdresseDisponible(event.target.value);
                }}
                sx={{
                  '& .MuiSelect-select': {
                    color: 'green',
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
                {adresses.map((adresse) => (
                  <MenuItem key={adresse._id} value={adresse._id}>
                    {adresse.adresse} {adresse.district} {adresse.delegation}{' '}
                    {adresse.ville}{' '}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex justify-center space-x-6 mb-6">
            {/* Description */}
            <TextField
              sx={{
                '& .MuiSelect-select': {
                  color: 'green',
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
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
              className="w-1/3"
              color="success"
              id="vitesse-input"
              label="Nombre Vitesse"
              variant="outlined"
              value={vitesse}
              onChange={(event) => {
                setVitesse(event.target.value);
              }}
            />

            {/* Suspension */}
            <TextField
              sx={{
                '& .MuiSelect-select': {
                  color: 'green',
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
              value={suspension}
              onChange={(event) => {
                setSuspension(event.target.value);
              }}
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
                      color: 'green',
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
                  value={roue.materiau}
                  onChange={(event) =>
                    setRoue({ ...roue, materiau: event.target.value })
                  }
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
                    color: 'green',
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
                value={roue.taille}
                onChange={(event) =>
                  setRoue({ ...roue, taille: event.target.value })
                }
              />
              <TextField
                sx={{
                  '& .MuiSelect-select': {
                    color: 'green',
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
                value={roue.poids}
                onChange={(event) =>
                  setRoue({ ...roue, poids: event.target.value })
                }
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
                      color: 'green',
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
                  value={cadre.materiau}
                  onChange={(event) =>
                    setCadre({ ...cadre, materiau: event.target.value })
                  }
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
                    color: 'green',
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
                value={cadre.taille}
                onChange={(event) =>
                  setCadre({ ...cadre, taille: event.target.value })
                }
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
                      color: 'green',
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
                  value={selle.materiau}
                  onChange={(event) =>
                    setSelle({ ...selle, materiau: event.target.value })
                  }
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
                      color: 'green',
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
                  value={frein.type}
                  onChange={(event) =>
                    setFrein({ ...frein, type: event.target.value })
                  }
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
            {categorie.nom == 'Vélos Electriques ' && (
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
                          color: 'green',
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
                      value={moteur.type}
                      onChange={(event) =>
                        setMoteur({ ...moteur, type: event.target.value })
                      }
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
                        color: 'green',
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
                    value={moteur.puissance}
                    onChange={(event) =>
                      setMoteur({ ...moteur, puissance: event.target.value })
                    }
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
                      type="checkbox"
                      id="checkboxLabelTwo"
                      className="sr-only"
                      onChange={() => {
                        setPliable(!isPliable);
                      }}
                    />
                    <div
                      className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                        isPliable && 'border-green bg-gray dark:bg-transparent'
                      }`}
                    >
                      <span
                        className={`opacity-0 ${isPliable && '!opacity-100'}`}
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
        <div className="fixed top-25 right-4 p-4 bg-green-400 text-white rounded shadow-lg">
          vélo ajoutée avec succès !
        </div>
      )}
    </div>
  );
}

export default VeloLocationForm;
