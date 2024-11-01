import { Link } from 'react-router-dom';
import CommandeTable from './CommandeTable';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


function Commandes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [dateCommande, setDateCommande] = useState(null);
  const [dateLivraison, setDateLivraison] = useState(null);
  const [sortOrderCommande, setSortOrderCommande] = useState('asc');
  const [sortOrderLivraison, setSortOrderLivraison] = useState('asc');
  const [statusFilters, setStatusFilters] = useState(['en cours', 'expédiée']);
  const anchorRef = useRef(null); // Reference for Popper

  const statusOptions = ['en cours', 'expédiée', 'livrée', 'annulée'];

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-green-600 dark:text-white">
            Commandes
          </h2>

          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link className="font-medium" to="">
                  Vente des Velos /
                </Link>
              </li>
              <li className="font-medium text-primary">Commandes</li>
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
            {/* Date de commande */}
            <FormControl
              fullWidth
              sx={{
                marginBottom: 2,
                '& .MuiInputLabel-root': { color: 'green' },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green',
                },
              }}
            >
              <div className="flex items-center justify-between">
                <DatePicker
                  label="Date de Commande"
                  value={dateCommande}
                  onChange={(newValue) => setDateCommande(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <div className="flex flex-col">
                  <Tooltip title="Tri croissant">
                    <IconButton
                      onClick={() => setSortOrderCommande('asc')}
                      color={
                        sortOrderCommande === 'asc' ? 'success' : 'default'
                      }
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Tri décroissant">
                    <IconButton
                      onClick={() => setSortOrderCommande('desc')}
                      color={
                        sortOrderCommande === 'desc' ? 'success' : 'default'
                      }
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </FormControl>

            {/* Date de livraison */}
            <FormControl
              fullWidth
              sx={{
                marginBottom: 3,
                '& .MuiInputLabel-root': { color: 'green' },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green',
                },
              }}
            >
              <div className="flex items-center justify-between w-[229px]">
                <DatePicker
                  label="Date de Livraison"
                  value={dateLivraison}
                  onChange={(newValue) => setDateLivraison(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                {/*  <div className="flex flex-col">
                  <Tooltip title="Tri croissant">
                    <IconButton
                      onClick={() => setSortOrderLivraison('asc')}
                      color={
                        sortOrderLivraison === 'asc' ? 'success' : 'default'
                      }
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Tri décroissant">
                    <IconButton
                      onClick={() => setSortOrderLivraison('desc')}
                      color={
                        sortOrderLivraison === 'desc' ? 'success' : 'default'
                      }
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  </Tooltip>
                </div> */}
              </div>
            </FormControl>

            {/* Filtre par statut */}
            <FormControl
              className="w-[229px]"
              sx={{
                '& .MuiInputLabel-root': { color: 'green' },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green',
                },
              }}
            >
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
          </Paper>
        </Popper>

        {/* CommandeTable Component */}
        <CommandeTable
          searchTerm={searchTerm}
          dateCommande={dateCommande}
          dateLivraison={dateLivraison}
          sortOrderCommande={sortOrderCommande}
          sortOrderLivraison={sortOrderLivraison}
          statusFilters={statusFilters}
        />
      </div>
      
    </LocalizationProvider>
  );
}

export default Commandes;
