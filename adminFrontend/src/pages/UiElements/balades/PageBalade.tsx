import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useVeloContext } from '../../../context/VeloContext';
import DragComponent from '../../../components/DragandDrop/DragComponent';
import axios from 'axios';
import Carousel from '../../../components/carousel';
import SimpleMap from '../../../components/Maps/SimpleMapComponent';
import TrajetMap from '../../../components/Maps/TrajetMapComponent';
import SupprimeModal from './SupprimeModal';


function PageBalade() {

  const [open, setOpen] = useState(false);

 
  const handleOpen = () => setOpen(true);

 
  const handleClose = () => setOpen(false);
  const { types } = useVeloContext();
  const location = useLocation();
  const { id } = location.state;
  const initialValues = {
    nom: '',
    description: '',
    dateDepart: '',
    duree: 0,
    tarif: 0,
    Difficulté: '',
    typeVelo: '',
    conseils: [''],
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [images, setImages] = useState([]);
  const [startPlace, setStartPlace] = useState({});
  const [endPlace, setEndPlace] = useState({});
  const [distance, setDistance] = useState(0);
  const [trajet, setTrajet] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/admin/balades/${id}`)
      .then((response) => {
        setFormValues({
          nom: response.data.data.nom,
          description: response.data.data.description,
          dateDepart: response.data.data.dateDepart,
          duree: response.data.data.duree,
          tarif: response.data.data.tarif,
          Difficulté: response.data.data.Difficulté,
          typeVelo: response.data.data.typeVelo,
          conseils: response.data.data.conseils,
        });
      
        setImages(() => {
          return response.data.data.images?.map((image) => image.path);
        });
        setDistance(response.data.data.distance);
        setTrajet(
          response.data.data.trajet.map((point) => ({
            lat: point?.lat,
            lng: point?.lng,
          })),
        );
        setStartPlace(response.data.data.adresseDepart);
        setEndPlace(response.data.data.adresseArrivée);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des types:', error);
      });
  }, [id]);

  const [showPopover, setShowPopover] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [ownerLicense, setOwnerLicense] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (event, index = null) => {
    const { name, value } = event.target;

    if (name === 'conseils') {
      const updatedConseils = [...formValues.conseils];
      updatedConseils[index] = value;
      setFormValues({ ...formValues, conseils: updatedConseils });
    } else {
      setFormValues({ ...formValues, [name]: value });
      // Supprimer l'erreur lorsque l'utilisateur corrige le champ
      setErrors({ ...errors, [name]: '' });
    }
  };

  const addConseilField = () => {
    setFormValues({ ...formValues, conseils: [...formValues.conseils, ''] });
  };

  const handleCancel = () => {
    setDisabled(true);
  };

  const handleUpdate = async () => {
    const newErrors = {};

    for (const [key, value] of Object.entries(formValues)) {
      if (!value || (Array.isArray(value) && value[0] === '')) {
        newErrors[key] = 'Ce champ est obligatoire';
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newBalade = {
      ...formValues,
      ownerLicense,
      adresseDepart: startPlace,
      adresseArrivée: endPlace,

      distance,
      trajet,
    };
    
    try {
      const response = await axios.put(
        `http://localhost:4000/admin/balades/${id}`,
        newBalade,
        {
          withCredentials: true,
        },
      );

      setFormValues({
        nom: response.data.data.nom,
        description: response.data.data.description,
        dateDepart: response.data.data.dateDepart,
        duree: response.data.data.duree,
        tarif: response.data.data.tarif,
        Difficulté: response.data.data.Difficulté,
        typeVelo: response.data.data.typeVelo,
        conseils: response.data.data.conseils,
      });
      
      setImages(() => {
        return response.data.data.images?.map((image) => image.path);
      });
      setDistance(response.data.data.distance);
      setTrajet(
        response.data.data.trajet.map((point) => ({
          lat: point?.lat,
          lng: point?.lng,
        })),
      );
      setStartPlace(response.data.data.adresseDepart);
      setEndPlace(response.data.data.adresseArrivée);
      setDisabled(true);
      setShowPopover(true);
      setTimeout(() => {
        setShowPopover(false);
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="align-middle bg-slate-100 p-8 ">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-green-600 dark:text-white">
            Nouvelle Balade
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link className="font-medium" to="/VenteVelos">
                  Réservation des Balades /
                </Link>
              </li>
              <li className="font-medium text-green">Balades</li>
            </ol>
            <div className="mt-2">
              {disabled ? (
                <button
                  className="px-4 ml-4 mt-3 py-2  text-red-600 border border-red-600 font-semibold rounded "
                  onClick={handleOpen}
                >
                  Supprimer
                </button>
              ) : (
                ''
              )}
            </div>
          </nav>
        </div>
        <div className="">
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} />
            <AccordionDetails className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center space-x-6 ">
                <TextField
                  sx={{ ...textFieldStyle }}
                  className="w-1/3"
                  color="success"
                  label="Nom"
                  variant="outlined"
                  name="nom"
                  value={formValues.nom}
                  onChange={handleChange}
                  disabled={disabled}
                  error={!!errors.nom}
                  helpertext={errors.nom}
                />
                <TextField
                  sx={{ ...textFieldStyle }}
                  className="w-1/3"
                  color="success"
                  label="Tarif/DT"
                  variant="outlined"
                  name="tarif"
                  value={formValues.tarif}
                  onChange={handleChange}
                  disabled={disabled}
                  error={!!errors.tarif}
                  helpertext={errors.tarif}
                />
              </div>

              <div className="flex justify-center space-x-6 mt-8">
                <div className="mt-2 w-90 ">
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
                    className="w-full"
                    color="success"
                    id="modele-input"
                    label="Durée/heure"
                    variant="outlined"
                    name="duree"
                    value={formValues.duree}
                    onChange={handleChange}
                    disabled={disabled}
                    error={!!errors.duree}
                    helpertext={errors.duree}
                  />
                </div>

                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker
                    disabled={disabled}
                    label="Date de Depart"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '',
                        width: '350px',
                        '& fieldset': {
                          borderColor: '#16A34A',
                        },
                        '&:hover fieldset': {
                          borderColor: '#16A34A',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#16A34A',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#16A34A',
                      },
                      '& .MuiIconButton-root': {
                        color: '',
                      },
                    }}
                    value={
                      formValues.dateDepart
                        ? dayjs(formValues.dateDepart)
                        : null
                    }
                    onChange={(newValue) => {
                      setFormValues({ ...formValues, dateDepart: newValue });
                      // Supprimer l'erreur lorsque l'utilisateur corrige le champ
                      setErrors({ ...errors, dateDepart: '' });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.dateDepart}
                        /*    helperText={errors.dateDepart} */
                      />
                    )}
                  />
                </DemoContainer>
              </div>

              <div className="flex justify-center space-x-6 mt-8 mb-6">
                <FormControl className="w-1/3">
                  <InputLabel sx={{ color: 'green' }}>Type Vélo</InputLabel>
                  <Select
                    sx={{ ...selectStyle }}
                    label="Type Vélo"
                    name="typeVelo"
                    value={formValues.typeVelo}
                    onChange={handleChange}
                    disabled={disabled}
                    error={!!errors.typeVelo}
                    helpertext={errors.typeVelo}
                  >
                    {types.map((type) => (
                      <MenuItem key={type._id} value={type.nom}>
                        {type.nom}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.typeVelo && (
                    <div className="text-red-600 text-sm">
                      {errors.typeVelo}
                    </div>
                  )}
                </FormControl>
                <FormControl className="w-1/3">
                  <InputLabel sx={{ color: 'green' }}>Difficulté</InputLabel>
                  <Select
                    sx={{ ...selectStyle }}
                    label="Difficulté"
                    name="Difficulté"
                    value={formValues.Difficulté}
                    onChange={handleChange}
                    disabled={disabled}
                    error={!!errors.Difficulté}
                    helpertext={errors.Difficulté}
                  >
                    <MenuItem value="facile">Facile</MenuItem>
                    <MenuItem value="modéré">Modéré</MenuItem>
                    <MenuItem value="difficile">Difficile</MenuItem>
                  </Select>
                  {errors.difficulte && (
                    <div className="text-red-600 text-sm">
                      {errors.difficulte}
                    </div>
                  )}
                </FormControl>
              </div>

              <div className="flex justify-center space-x-6 mb-6">
                <TextField
                  sx={textFieldStyle}
                  className="w-full"
                  color="success"
                  label="Description"
                  variant="outlined"
                  name="description"
                  disabled={disabled}
                  multiline
                  rows={4}
                  value={formValues.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helpertext={errors.description}
                />
              </div>

              <div className="flex justify-center space-x-6 mb-6">
                {formValues.conseils?.map((conseil, index) => (
                  <TextField
                    key={index}
                    sx={textFieldStyle}
                    className="w-full"
                    color="success"
                    label={`Conseil ${index + 1}`}
                    variant="outlined"
                    name="conseils"
                    value={conseil}
                    disabled={disabled}
                    onChange={(e) => handleChange(e, index)}
                    error={!!errors.conseils}
                    helpertext={errors.conseils}
                  />
                ))}
                <IconButton onClick={addConseilField}>
                  <AddIcon />
                </IconButton>
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
              <div className="flex justify-center space-x-4 mb-4">
                <TextField
                  sx={{ ...textFieldStyle }}
                  className="w-2/3"
                  color="success"
                  placeholder="Adresse Départ"
                  variant="outlined"
                  name="adresseDepart"
                  disabled
                  value={startPlace.nom}
                  onChange={handleChange}
                />

                <TextField
                  sx={{ ...textFieldStyle }}
                  className="w-2/3"
                  color="success"
                  placeholder="Adresse Arrivée"
                  variant="outlined"
                  name="adresseArrivee"
                  disabled
                  value={endPlace.nom}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center space-x-4 mb-4">
                <TextField
                  sx={{ ...textFieldStyle }}
                  className="w-1/3"
                  color="success"
                  label="Distance/Km"
                  variant="outlined"
                  name="longeur"
                  disabled
                  value={distance}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center mb-5">
                {trajet.length > 0 ? (
                  disabled ? (
                    <SimpleMap trajet={trajet} />
                  ) : (
                    <TrajetMap
                      setStartPlace={setStartPlace}
                      setEndPlace={setEndPlace}
                      setDistance={setDistance}
                      setTrajet={setTrajet}
                      trajet={trajet}
                    />
                  )
                ) : (
                  <div>Aucun trajet disponible</div> // Affiche un message si trajet est vide
                )}
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
                  onClick={handleCancel}
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
          <div className="fixed top-25 right-4 p-4 bg-green-200 text-white rounded shadow-lg">
            balade ajoutée avec succès !
          </div>
        )}

        <SupprimeModal
          open={open}
          handleClose={handleClose}
          baladeId={id}
        />
      </div>
    </LocalizationProvider>
  );
}
const textFieldStyle = {
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

const selectStyle = {
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
};

const datePickerStyle = {
  '& .MuiOutlinedInput-root': {
    borderColor: '#16A34A',
  },
  '& .MuiInputLabel-root': {
    color: '#16A34A',
  },
};
export default PageBalade;
