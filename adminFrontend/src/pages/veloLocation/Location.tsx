import { Link } from 'react-router-dom';

import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Popper,
  Paper,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from 'axios';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import LocationTable from './LocationTable';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ClearIcon from '@mui/icons-material/Clear';

function Locations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [sortOrderDebutLocation, setSortOrderDebutLocation] = useState('asc');
  const [sortOrderFinLocation, setSortOrderFinLocation] = useState('asc');
  const [adressesLocal, setAdressesLocal] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [statusFilters, setStatusFilters] = useState([
    'Réservé',
    'En Cours',
    'En retard',
  ]);
  const anchorRef = useRef(null); // Reference for Popper
  const statusOptions = [
    'Réservé',
    'En Cours',
    'Terminé',
    'Annulé',
    'En retard',
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatusFilters(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/adressesLocal')
      .then((response) => {
        setAdressesLocal(response.data.data);
        
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des adresses', error);
      });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-green-600 dark:text-white">
            Locations
          </h2>
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link className="font-medium" to="">
                  Location des Velos /
                </Link>
              </li>
              <li className="font-medium text-primary">Locations</li>
            </ol>
          </nav>
        </div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              width: 300,
              backgroundColor: '#ffff',
              borderRadius: '30px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#16a34a',
                  borderRadius: '30px',
                },
                '&:hover fieldset': {
                  borderColor: '#16a34a',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#16a34a',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#16a34a' }} />
                </InputAdornment>
              ),
              style: { color: '#9CA3AF' },
            }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleClickOpen}
            ref={anchorRef}
          >
            Filtrer
          </Button>
        </div>
        {/* Popper pour le filtre */}
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
        >
          <Paper sx={{ padding: 2, width: 300 }}>
            {/* Date de début */}
            <FormControl fullWidth sx={datePickerStyle}>
              <div className="flex items-center justify-between mb-3">
                <DatePicker
                  label="Date de Début"
                  value={dateDebut}
                  onChange={(newValue) => setDateDebut(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <div className="flex flex-col">
                  <Tooltip title="Tri croissant">
                    <IconButton
                      onClick={() => setSortOrderDebutLocation('asc')}
                      color={
                        sortOrderDebutLocation === 'asc' ? 'success' : 'default'
                      }
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Tri décroissant">
                    <IconButton
                      onClick={() => setSortOrderDebutLocation('desc')}
                      color={
                        sortOrderDebutLocation === 'desc'
                          ? 'success'
                          : 'default'
                      }
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </FormControl>
            {/* Date de fin */}
            <FormControl fullWidth sx={datePickerStyle}>
              <div className="flex items-center justify-between mb-3">
                <DatePicker
                  label="Date de Fin"
                  value={dateFin}
                  onChange={(newValue) => setDateFin(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <div className="flex flex-col">
                  <Tooltip title="Tri croissant">
                    <IconButton
                      onClick={() => setSortOrderFinLocation('asc')}
                      color={
                        sortOrderFinLocation === 'asc' ? 'success' : 'default'
                      }
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Tri décroissant">
                    <IconButton
                      onClick={() => setSortOrderFinLocation('desc')}
                      color={
                        sortOrderFinLocation === 'desc' ? 'success' : 'default'
                      }
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </FormControl>
            {/* Sélection des adresses de location */}
            <FormControl fullWidth sx={datePickerStyle}>
              <InputLabel>Local de Récupération</InputLabel>
              <Select
                labelId="pickup-location-label"
                value={selectedAddress}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setSelectedAddress(selectedId);
                }}
                label="Local de récupération"
                color="success"
              >
                {adressesLocal.map((adresse) => {
                  const fullAddress = `${adresse.adresse}, ${adresse.district}, ${adresse.delegation}, ${adresse.ville}`;
                  return (
                    <MenuItem key={adresse._id} value={adresse._id}>
                      {fullAddress}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* Filtre par statut */}
            <div className=" mt-3">
              <FormControl className="w-[265px]" sx={datePickerStyle}>
                <InputLabel>Status</InputLabel>
                <Select
                  multiple
                  value={statusFilters}
                  onChange={handleStatusChange}
                  input={<OutlinedInput label="Status" />}
                  renderValue={(selected) => selected.join(', ')}
                  color="success"
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      <Checkbox
                        color="success"
                        checked={statusFilters.indexOf(status) > -1}
                      />
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {/* Bouton de réinitialisation */}
            <div className="flex justify-end mt-4">
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  // Réinitialiser tous les filtres
                  setDateDebut(null);
                  setDateFin(null);
                  setSelectedAddress('');
                  setStatusFilters(['Réservé', 'En Cours', 'En retard']);
                  setSortOrderDebutLocation("asc");
                  setSortOrderFinLocation("asc");
                }}
              >
                <ClearIcon /> 
              </Button>
            </div>
          </Paper>
        </Popper>

        <LocationTable
          searchTerm={searchTerm}
          dateDebut={dateDebut}
          dateFin={dateFin}
          sortOrderDebutLocation={sortOrderDebutLocation}
          sortOrderFinLocation={sortOrderFinLocation}
          statusFilters={statusFilters}
          selectedAdress={selectedAddress}
        />
      </div>
    </LocalizationProvider>
  );
}


const datePickerStyle = {
  "& .MuiInputBase-root": {
    borderColor: "#16A34A",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#16A34A",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#16A34A",
  },
};
export default Locations;
