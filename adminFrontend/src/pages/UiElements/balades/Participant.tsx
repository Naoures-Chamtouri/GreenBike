import { useLocation } from "react-router-dom";


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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ParticipantTable from "./ParticipantTable";

function PageParticipant() {
  const location = useLocation();
  const { balade } = location.state;
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [dateReservation, setDateReservation] = useState(null);

  const [sortOrderReservation, setSortOrderReservation] = useState('desc');
  const anchorRef = useRef(null); // Reference for Popper

  const statusOptions = ['payée','annulée','réservée'];

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
            Participants
          </h2>

          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link className="font-medium" to="/ReservationBalades/Balades">
                  Balades/
                </Link>
              </li>

              <li className="font-medium text-primary">Participants</li>
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
                  label="Date de Reservation"
                  value={dateReservation}
                  onChange={(newValue) => setDateReservation(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <div className="flex flex-col">
                  <Tooltip title="Tri croissant">
                    <IconButton
                      onClick={() => setSortOrderReservation('asc')}
                      color={
                        sortOrderReservation === 'asc' ? 'success' : 'default'
                      }
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Tri décroissant">
                    <IconButton
                      onClick={() => setSortOrderReservation('desc')}
                      color={
                        sortOrderReservation === 'desc' ? 'success' : 'default'
                      }
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </FormControl>
          </Paper>
        </Popper>

        {/* CommandeTable Component */}
        <ParticipantTable
          searchTerm={searchTerm}
          dateReservation={dateReservation}
          sortOrderReservation={sortOrderReservation}
          id={balade._id}
        />
      </div>
    </LocalizationProvider>
  );
}

export default PageParticipant;

