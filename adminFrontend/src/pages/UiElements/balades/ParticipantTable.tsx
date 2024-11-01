import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ParticipantTable = ({
  searchTerm,
  dateReservation,
  sortOrderReservation,
  
  id,
}) => {
  const [reservations, setReservations] = useState([]);
  const [update, setUpdate] = useState([]);
  const [statusReservation, setStatutReservation] = useState('payée');
  const [loading, setLoading] = useState(true);
  const statusOptions = ['payée', 'annulée', 'réservée'];

  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const handleUpdate = async (reservationId, index) => {
    try {
      const updatedData = {
        status: statusReservation || reservations[index].status,
      };

      const response = await axios.put(
        `http://localhost:4000/admin/reservations/${reservationId}`,
        updatedData,
      );

      const updatedReservations = [...reservations];
      updatedReservations[index] = response.data.data;
      setReservations(updatedReservations);

      setStatutReservation('');

      setUpdate((prev) => {
        const newUpdate = [...prev];
        newUpdate[index] = false;
        return newUpdate;
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réservation:', error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/admin/reservations/${id}`)
      .then((response) => {
        setReservations(response.data.data);
        setLoading(false);
        setUpdate(Array(response.data.data.length).fill(false));
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des réservations:',
          error,
        );
      });
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  const filteredReservations = reservations.filter((reservation) => {
    return (
      (!searchTerm ||
        reservation.participant.utilisateur.nomUtilisateur
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (!dateReservation ||
        isSameDay(reservation.dateReservation, dateReservation))
    );
  });

  const sortedReservations = filteredReservations.sort((a, b) => {
    const dateARes = new Date(a.dateReservation);
    const dateBRes = new Date(b.dateReservation);

    return sortOrderReservation === 'asc'
      ? dateARes - dateBRes
      : dateBRes - dateARes;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-8 font-medium text-black dark:text-white">
                  Nom
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Numéro Téléphone
                </th>
                <th className="min-w-[120px] py-4 px-2 pl-5 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[120px] py-4 px-2 font-medium text-black dark:text-white">
                  Date Reservation
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Statut
                </th>
               
              </tr>
            </thead>
            <tbody>
              {sortedReservations.map((reservation, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark xl:pl-11">
                    <h4 className="font-medium text-black dark:text-white">
                      {reservation.participant.utilisateur.nomUtilisateur}
                    </h4>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-3 dark:border-strokedark xl:pl-11">
                    <h4 className="font-medium text-black dark:text-white">
                      {reservation.numTelephone}
                    </h4>
                  </td>
                  <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                    <h4 className="font-medium text-black dark:text-white">
                      {reservation.participant.utilisateur.email}
                    </h4>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h4 className="font-medium text-black dark:text-white">
                      {new Date(
                        reservation.dateReservation,
                      ).toLocaleDateString()}
                    </h4>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {update[key] ? (
                      <FormControl
                        className="w-30"
                        color="success"
                        sx={{
                          '& .MuiInputLabel-root': { color: 'green' },
                          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                            { borderColor: 'green' },
                        }}
                      >
                        <InputLabel>Statut</InputLabel>
                        <Select
                          value={statusReservation || reservation.status}
                          onChange={(e) => setStatutReservation(e.target.value)}
                          input={<OutlinedInput label="Statut" />}
                          color="success"
                        >
                          {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <span
                        className={`status-badge ${
                          reservation.status === 'payée'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {reservation.status}
                      </span>
                    )}
                  </td>
              
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default ParticipantTable;
