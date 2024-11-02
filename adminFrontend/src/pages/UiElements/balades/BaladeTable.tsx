import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SupprimeModal from './SupprimeModal';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';



const BaladeTable = ({ searchTerm, dateDepart, sortOrderDate,statusBalade }) => {
  

   const [open, setOpen] = useState(false);
   const [baladeId,setBaladeId]=useState(null)
   const [loading, setLoading] = useState(true);
   const [update, setUpdate] = useState(Array(0).fill(false));
    const statusOptions = ['Publiée', 'Archivée'];
    const [status, setStatus] = useState('');
   const handleOpen = (id) => {setOpen(true);
 
    setBaladeId(id)
   };

   const handleClose = () => setOpen(false);
  const [balades, setBalades] = useState([]);
  const navigate = useNavigate();

  const handleVoirBalade = (id) => {
    navigate(`/ReservationBalades/Balades/${id}`, { state: { id } });
  };
    const handleVoirParticipants = (id,balade) => {
      navigate(`/ReservationBalades/Balades/participants/${id}`, { state: { balade } });
    };

    const handleChangeStatus = (baladeId, newStatus) => {
      const updatedBalades = balades.map((balade) =>
        balade._id === baladeId ? { ...balade, etat: newStatus } : balade,
      );
      setBalades(updatedBalades);
    };
const handleUpdate = async (baladeId, index) => {
  try {
    
    const updatedData = {
      etat: status || balades[index].etat,
    };

    const response = await axios.put(
      `http://localhost:4000/admin/balades/${baladeId}`,
      updatedData,
    );
   handleChangeStatus(baladeId,status)
    const updatedBalades = [...balades];
    updatedBalades[index] = response.data.data;
    setBalades(updatedBalades);

    setUpdate((prev) => {
      const newUpdate = [...prev];
      newUpdate[index] = false;
      return newUpdate;
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande:', error);
  }
};
  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/balades')
      .then((response) => {
        setBalades(response.data.data);
          setUpdate(Array(response.data.data.length).fill(false));
     
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des balades:', error);
      });
  }, [setBalades]);

   

  
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

  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const filteredBalades = balades.filter((balade) => {
    const matchesSearchTerm =
      ((!statusBalade|| (statusBalade==balade.etat)) &&
        balade.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (balade.adresseDepart?.location &&
        balade.adresseDepart.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (balade.adresseArrivée?.location &&
        balade.adresseArrivée.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesDateDepart =
      !dateDepart || isSameDay(balade.dateDepart, dateDepart);

    return matchesSearchTerm && matchesDateDepart;
  });

  const sortedBalades = filteredBalades.sort((a, b) => {
    const dateABalade = new Date(a.dateDepart);
    const dateBBalade = new Date(b.dateDepart);

    if (sortOrderDate === 'asc') {
      return dateABalade - dateBBalade;
    } else {
      return dateBBalade - dateABalade;
    }
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Nom
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Adresse Depart
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Adresse Arrivée
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Date Départ
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Heure Départ
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                tarif
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Participants
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBalades?.map((balade, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-3  dark:border-strokedark ">
                  <h4 className="font-medium text-black dark:text-white">
                    {balade.nom}
                  </h4>
                  <p className="text-sm"></p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark pl-3">
                  <h4 className="font-medium text-black dark:text-white">
                    {balade.adresseDepart.nom}
                  </h4>
                  <p className="text-sm"></p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark pl-3">
                  <h4 className="font-medium text-black dark:text-white">
                    {balade.adresseArrivée.nom}
                  </h4>
                  <p className="text-sm"></p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h4 className="font-medium text-black dark:text-white">
                    {new Date(balade.dateDepart).toLocaleDateString()}
                  </h4>
                </td>
                <td className="border-b border-[#eee] py-5 px-7 dark:border-strokedark">
                  <h4 className="font-medium text-black dark:text-white">
                    {new Date(balade.dateDepart).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </h4>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h4 className="font-medium text-black dark:text-white">
                    {balade.tarif}
                  </h4>
                </td>
                <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark pl-3">
                  <button
                    className="rounded-xl bg-green-500 text-white"
                    onClick={() => {
                      handleVoirParticipants(balade._id, balade);
                    }}
                  >
                    Voir Participants
                  </button>
                  <p className="text-sm"></p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
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
                        <InputLabel>Statut</InputLabel>
                        <Select
                          value={status || balade.etat}
                          onChange={(e) => setStatus(e.target.value)}
                          input={<OutlinedInput label="Status" />}
                          color="success"
                        >
                          {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  ) : (
                    <span
                      className={`status-badge ${
                        balade.etat === 'Publiée'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {balade.etat}
                    </span>
                  )}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {update[key] ? (
                    <div className="flex items-center">
                      <button
                        className="mr-2"
                        onClick={() => handleUpdate(balade._id, key)}
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
                          
                          setStatus('');
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
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-green-600"
                        onClick={() => {
                          handleVoirBalade(balade._id);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      <button
                        className="hover:text-green-600"
                        onClick={() => {
                          handleOpen(balade._id);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      <button
                        className="pl-1 hover:text-green-600"
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
                <SupprimeModal
                  open={open}
                  handleClose={handleClose}
                  baladeId={baladeId}
                  balades={balades}
                  setBalades={setBalades}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BaladeTable;
