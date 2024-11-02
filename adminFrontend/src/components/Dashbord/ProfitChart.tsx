import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LogarithmicScale,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  ArcElement,
  Title,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);


function ProfitChart() {
  const [reservations, setReservations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/commandes')
      .then((response) => setCommandes(response.data.data))
      .catch((error) =>
        console.error('Erreur lors de la récupération des commandes:', error),
      );
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/locations')
      .then((response) => setLocations(response.data.data))
      .catch((error) =>
        console.error('Erreur lors de la récupération des locations:', error),
      );
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/reservations')
      .then((response) => setReservations(response.data.data))
      .catch((error) =>
        console.error(
          'Erreur lors de la récupération des réservations:',
          error,
        ),
      );
  }, []);

  // Calcul du total sans filtre
  const calculateTotal = (data, priceKey) =>
    data?.reduce((sum, item) => sum + (item[priceKey] || 0), 0);

  const calculateTotal2 = (data, priceKey) =>
    data?.reduce((sum, item) => sum + (item.balade[priceKey] || 0), 0);

  const totalCommandes = calculateTotal(commandes, 'total');
  const totalLocations = calculateTotal(locations, 'prixLocation');
  const totalReservations = calculateTotal2(reservations, 'tarif');

  const commandesData = {
    labels: ['Livrée', 'En cours', 'Expédiée', 'Annulée'],
    datasets: [
      {
        data: ['livrée', 'en cours', 'expédiée', 'annulée'].map(
          (status) =>
            commandes.filter((item) => item.statutCommande === status).length,
        ),
        backgroundColor: ['#B3E5FC', '#81D4FA', '#4FC3F7', '#0288D1'],
        hoverBackgroundColor: ['#81D4FA', '#4FC3F7', '#0288D1', '#01579B'],
      },
    ],
  };

  const locationsData = {
    labels: ['Réservé', 'En Cours', 'Terminé', 'Annulé', 'En retard'],
    datasets: [
      {
        data: ['Réservé', 'En Cours', 'Terminé', 'Annulé', 'En retard'].map(
          (etat) => locations?.filter((item) => item.etat === etat).length,
        ),
        backgroundColor: [
          '#FFECB3',
          '#FFD54F',
          '#FFC107',
          '#FFA000',
          '#FF6F00',
        ],
        hoverBackgroundColor: [
          '#FFD54F',
          '#FFC107',
          '#FFA000',
          '#FF6F00',
          '#E65100',
        ],
      },
    ],
  };

  const reservationsData = {
    labels: ['Réservée'],
    datasets: [
      {
        data: ['payée'].map(
          (status) =>
            reservations?.filter((item) => item.status === status).length,
        ),
        backgroundColor: ['#C8E6C9', '#A5D6A7'],
        hoverBackgroundColor: ['#A5D6A7', '#66BB6A'],
      },
    ],
  };

  const barData = {
    labels: ['Commandes', 'Locations', 'Réservations'],
    datasets: [
      {
        label: 'Total en DT',
        data: [totalCommandes, totalLocations, totalReservations],
        backgroundColor: ['#4FC3F7', '#FFB74D', '#81C784'],
        borderColor: ['#0288D1', '#F57C00', '#388E3C'],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Juin',
      'Juil',
      'Août',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ],
    datasets: [
      {
        label: 'Profits Commandes',
        data: Array.from({ length: 12 }, () =>
          Math.floor(Math.random() * 500),
        ),
        borderColor: '#4FC3F7',
        fill: false,
      },
      {
        label: 'Profits Locations',
        data: Array.from({ length: 12 }, () =>
          Math.floor(Math.random() * 400),
        ),
        borderColor: '#FFB74D',
        fill: false,
      },
      {
        label: 'Profits Réservations',
        data: Array.from({ length: 12 }, () =>
          Math.floor(Math.random() * 300),
        ),
        borderColor: '#81C784',
        fill: false,
      },
    ],
  };

  const chartOptions2 = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Statistiques de Services' },
    },
    scales: {
      y: {
        type: 'logarithmic', // Utilisez l'échelle logarithmique
        title: {
          display: true,
          text: 'Total en DT',
        },
        min: 1, // Assurez-vous que le minimum est supérieur à 0
      },
    },
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top',
        title: { display: true, text: 'Statistiques de Services' },
    },
  }};

  return (
    <div className="p-8 space-y-8 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            États des Commandes
          </h3>
          <Doughnut data={commandesData} options={chartOptions} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            États des Locations
          </h3>
          <Doughnut data={locationsData} options={chartOptions} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            États des Réservations
          </h3>
          <Doughnut data={reservationsData} options={chartOptions} />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Tableau de Bord des Profits
      </h2>

      {/* Profits par Catégorie */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Profits par Catégorie
        </h3>
        <Bar data={barData} options={chartOptions2} />
      </div>

    
    </div>
  );
}

export default ProfitChart;
