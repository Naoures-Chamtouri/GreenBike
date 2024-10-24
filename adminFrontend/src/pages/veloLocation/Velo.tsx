import { Link } from 'react-router-dom';
import VeloTable from './VeloTable';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

function VelosLocation() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-green-600 dark:text-white">
          Velos
        </h2>

        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/LocationVelos">
                Location des Velos /
              </Link>
            </li>
            <li className="font-medium text-primary">Velos</li>
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
                borderColor: 't#16a34a',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#16a34a',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#16a34a' }} />{' '}
                {/* Green search icon */}
              </InputAdornment>
            ),
            style: { color: '#9CA3AF' }, // Placeholder and text color
          }}
        />
        <Link
          to="/LocationVelos/Velos/ajouter"
          className="inline-flex items-center bg-white justify-center gap-2.5 rounded-md border border-green-600 py-2 px-4 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                stroke="#16a34a"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                stroke="#16a34a"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          Ajouter Velo
        </Link>
      </div>
      <VeloTable searchTerm={searchTerm} />
    </div>
  );
}

export default VelosLocation;
