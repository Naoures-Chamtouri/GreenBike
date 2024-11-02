import { Box, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { useEffect, useState } from "react";


function LocationTable({
  searchTerm,
  dateDebut,
  dateFin,
  sortOrderDebutLocation,
  sortOrderFinLocation,
  statusFilters,
  selectedAdress,
}) {

  const [locations, setLocations] = useState([]);
  const [update, setUpdate] = useState(Array(0).fill(false));
  const [statusLocation, setStatutLocation] = useState('');
     const [loading, setLoading] = useState(true);


 
  const statusOptions = [
    'Réservé',
    'En Cours',
    'Terminé',
    'Annulé',
    'En retard'];

  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const handleUpdate = async (locationId, index) => {
    try {
      const updatedData = {
        etat: statusLocation || locations[index].etat
      };
      
      const response = await axios.put(
        `http://localhost:4000/admin/locations/${locationId}`,
        updatedData,
      );

      const updatedLocations = [...locations];
      updatedLocations[index] = response.data.data;
      setLocations(updatedLocations);

      setStatutLocation('');
      
      setUpdate((prev) => {
        const newUpdate = [...prev];
        newUpdate[index] = false;
        return newUpdate;
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la location:', error);
    }
  };


  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/locations')
      .then((response) => {
          
        setLocations(response.data.data);
        setUpdate(Array(response.data.data.length).fill(false));
         setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des locations:', error);
      });
  }, [setLocations]);

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
  const filteredLocations = locations.filter((location) => {
    return (
      (!searchTerm ||
        location.client.utilisateur.nomUtilisateur
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        location.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.velo.velo.modele
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        location.velo.velo.marque.nom
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        location.velo.velo.type.nom
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (!statusFilters || statusFilters.includes(location.etat)) &&
      (!dateDebut || isSameDay(location.dateDebut, dateDebut)) &&
      (!dateFin || isSameDay(location.dateFin, dateFin))
    );
  });

  const sortedLocations = filteredLocations.sort((a, b) => {
    const dateADebut = new Date(a.dateDebut);
    const dateBDebut = new Date(b.dateDebut);
    const dateAFin = new Date(a.dateFin);
    const dateBFin = new Date(b.dateFin);

    if (sortOrderDebutLocation === 'asc') {
      return dateADebut - dateBDebut || dateAFin - dateBFin;
    } else {
      return dateBDebut - dateADebut || dateBFin - dateAFin;
    }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Client
                </th>
              {/*   <th className="min-w-[120px] py-4 px-8 font-medium text-black dark:text-white">
                  Email
                </th> */}
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Telephone
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Velo
                </th>
                <th className="min-w-[90px] py-4 px-2 font-medium text-black dark:text-white">
                  Qté
                </th>
                <th className="min-w-[120px] py-4 px-2 font-medium text-black dark:text-white">
                  Local
                </th>
                <th className="min-w-[120px] py-4 px-2 font-medium text-black dark:text-white">
                  Date Debut
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Date Fin
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                 Prix
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedLocations.reverse().map((location, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark ">
                    <h4 className="font-medium text-black dark:text-white">
                      {location.client.utilisateur.nomUtilisateur ||
                        location.nom}
                    </h4>
                  </td>
                 {/*  <td className="border-b border-[#eee] py-5 px-3 dark:border-strokedark xl:pl-11">
                    <h4 className="font-medium text-black dark:text-white">
                      {location.client.utilisateur.email}
                    </h4>
                  </td> */}
                  <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark ">
                    <h4 className="font-medium text-black dark:text-white">
                      {location.numTelephone}
                    </h4>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                    <h4 className="font-medium text-black dark:text-white">
                      {location.velo.velo.type.nom}{' '}
                      {location.velo.velo.marque.nom}{' '}
                      {location.velo.velo.modele}
                    </h4>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                    <h4 className="font-medium text-black dark:text-white">
                      {location.quantité}
                    </h4>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark">
                    <h4 className="font-medium text-black dark:text-white">
                      {location.localLocation.adresse},
                      {location.localLocation.district},
                      {location.localLocation.delegation},
                      {location.localLocation.ville}
                    </h4>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark">
                    <h4 className="font-medium text-black dark:text-white">
                      {new Date(location.dateDebut).toLocaleString()}
                    </h4>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark">
                    <h4 className="font-medium text-black dark:text-white">
                      {new Date(location.dateFin).toLocaleString()}
                    </h4>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark">
                    <h4 className="font-medium text-black dark:text-white">
                      {location.prixLocation} TND
                    </h4>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark">
                    {update[key] ? (
                      <div>
                        <FormControl
                          className="w-30"
                          color="success"
                          sx={{
                            '& .MuiInputLabel-root': { color: 'green' },
                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                              { borderColor: 'green' },
                          }}
                        >
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={statusLocation || location.etat}
                            onChange={(e) => setStatutLocation(e.target.value)}
                            input={<OutlinedInput label="Status" />}
                            color="success"
                          >
                            {statusOptions.map((status) => (
                              <MenuItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    ) : (
                      <span
                        className={`status-badge ${
                          location.etat === 'Terminé'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {location.etat}
                      </span>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark">
                    {update[key] ? (
                      <div className="flex items-center">
                        <button
                          className="mr-2"
                          onClick={() => handleUpdate(location._id, key)}
                        >
                          <svg
                            width="22px"
                            height="22px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 12.6111L8.92308 17.5L20 6.5"
                              stroke="#009900"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setStatutLocation('');
                            setUpdate((prev) => {
                              const newUpdate = [...prev];
                              newUpdate[key] = false;
                              return newUpdate;
                            });
                          }}
                        >
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 512 512"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>cancel</title>
                            <g
                              id="Page-1"
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g
                                id="work-case"
                                fill="#000000"
                                transform="translate(91.52, 91.52)"
                              >
                                <polygon
                                  id="Close"
                                  points="328.96 30.2933333 298.666667 0 164.48 134.4 30.2933333 0 0 30.2933333 134.4 164.48 0 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
                                ></polygon>
                              </g>
                            </g>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center ">
                        
                        <button
                          className="pl-2 hover:text-green-600"
                          onClick={() =>
                            setUpdate((prev) => {
                              const newUpdate = [...prev];
                              newUpdate[key] = true; // Open the update mode
                              return newUpdate;
                            })
                          }
                        >
                          <svg
                            width="24px"
                            height="24px"
                            viewBox="0 -0.5 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.2942 7.95881C13.5533 7.63559 13.5013 7.16358 13.178 6.90453C12.8548 6.64549 12.3828 6.6975 12.1238 7.02072L13.2942 7.95881ZM6.811 14.8488L7.37903 15.3385C7.38489 15.3317 7.39062 15.3248 7.39623 15.3178L6.811 14.8488ZM6.64 15.2668L5.89146 15.2179L5.8908 15.2321L6.64 15.2668ZM6.5 18.2898L5.7508 18.2551C5.74908 18.2923 5.75013 18.3296 5.75396 18.3667L6.5 18.2898ZM7.287 18.9768L7.31152 19.7264C7.36154 19.7247 7.41126 19.7181 7.45996 19.7065L7.287 18.9768ZM10.287 18.2658L10.46 18.9956L10.4716 18.9927L10.287 18.2658ZM10.672 18.0218L11.2506 18.4991L11.2571 18.491L10.672 18.0218ZM17.2971 10.959C17.5562 10.6358 17.5043 10.1638 17.1812 9.90466C16.8581 9.64552 16.386 9.69742 16.1269 10.0206L17.2971 10.959ZM12.1269 7.02052C11.8678 7.34365 11.9196 7.81568 12.2428 8.07484C12.5659 8.33399 13.0379 8.28213 13.2971 7.95901L12.1269 7.02052ZM14.3 5.50976L14.8851 5.97901C14.8949 5.96672 14.9044 5.95412 14.9135 5.94123L14.3 5.50976ZM15.929 5.18976L16.4088 4.61332C16.3849 4.59344 16.3598 4.57507 16.3337 4.5583L15.929 5.18976ZM18.166 7.05176L18.6968 6.52192C18.6805 6.50561 18.6635 6.49007 18.6458 6.47532L18.166 7.05176ZM18.5029 7.87264L19.2529 7.87676V7.87676L18.5029 7.87264ZM18.157 8.68976L17.632 8.15412C17.6108 8.17496 17.5908 8.19704 17.5721 8.22025L18.157 8.68976ZM16.1271 10.0203C15.8678 10.3433 15.9195 10.8153 16.2425 11.0746C16.5655 11.3339 17.0376 11.2823 17.2969 10.9593L16.1271 10.0203ZM13.4537 7.37862C13.3923 6.96898 13.0105 6.68666 12.6009 6.74805C12.1912 6.80943 11.9089 7.19127 11.9703 7.60091L13.4537 7.37862ZM16.813 11.2329C17.2234 11.1772 17.5109 10.7992 17.4552 10.3888C17.3994 9.97834 17.0215 9.69082 16.611 9.74659L16.813 11.2329ZM12.1238 7.02072L6.22577 14.3797L7.39623 15.3178L13.2942 7.95881L12.1238 7.02072ZM6.24297 14.359C6.03561 14.5995 5.91226 14.9011 5.89159 15.218L7.38841 15.3156C7.38786 15.324 7.38457 15.3321 7.37903 15.3385L6.24297 14.359ZM5.8908 15.2321L5.7508 18.2551L7.2492 18.3245L7.3892 15.3015L5.8908 15.2321ZM5.75396 18.3667C5.83563 19.1586 6.51588 19.7524 7.31152 19.7264L7.26248 18.2272C7.25928 18.2273 7.25771 18.2268 7.25669 18.2264C7.25526 18.2259 7.25337 18.2249 7.25144 18.2232C7.2495 18.2215 7.24825 18.2198 7.24754 18.2185C7.24703 18.2175 7.24637 18.216 7.24604 18.2128L5.75396 18.3667ZM7.45996 19.7065L10.46 18.9955L10.114 17.536L7.11404 18.247L7.45996 19.7065ZM10.4716 18.9927C10.7771 18.9151 11.05 18.7422 11.2506 18.499L10.0934 17.5445C10.0958 17.5417 10.0989 17.5397 10.1024 17.5388L10.4716 18.9927ZM11.2571 18.491L17.2971 10.959L16.1269 10.0206L10.0869 17.5526L11.2571 18.491ZM13.2971 7.95901L14.8851 5.97901L13.7149 5.04052L12.1269 7.02052L13.2971 7.95901ZM14.9135 5.94123C15.0521 5.74411 15.3214 5.6912 15.5243 5.82123L16.3337 4.5583C15.4544 3.99484 14.2873 4.2241 13.6865 5.0783L14.9135 5.94123ZM15.4492 5.7662L17.6862 7.6282L18.6458 6.47532L16.4088 4.61332L15.4492 5.7662ZM17.6352 7.58161C17.7111 7.6577 17.7535 7.761 17.7529 7.86852L19.2529 7.87676C19.2557 7.36905 19.0555 6.88127 18.6968 6.52192L17.6352 7.58161ZM17.7529 7.86852C17.7524 7.97604 17.7088 8.07886 17.632 8.15412L18.682 9.22541C19.0446 8.87002 19.2501 8.38447 19.2529 7.87676L17.7529 7.86852ZM17.5721 8.22025L16.1271 10.0203L17.2969 10.9593L18.7419 9.15928L17.5721 8.22025ZM11.9703 7.60091C12.3196 9.93221 14.4771 11.5503 16.813 11.2329L16.611 9.74659C15.0881 9.95352 13.6815 8.89855 13.4537 7.37862L11.9703 7.60091Z"
                              fill="#666666"
                            />
                          </svg>
                        </button>
                      </div>
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
}

export default LocationTable
