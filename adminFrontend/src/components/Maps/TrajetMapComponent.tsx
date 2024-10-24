import {
  FeatureGroup,
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';
import axios from 'axios';
import L from 'leaflet';


const villesTunisie = [
  { ville: 'Tunis', lat: 36.8065, lng: 10.1815 },
  { ville: 'Sfax', lat: 34.7406, lng: 10.7603 },
  { ville: 'Sousse', lat: 35.8256, lng: 10.6369 },
  { ville: 'Gabès', lat: 33.8815, lng: 10.0982 },
  { ville: 'Kairouan', lat: 35.6781, lng: 10.0963 },
  { ville: 'Bizerte', lat: 37.2744, lng: 9.8739 },
  { ville: 'Gafsa', lat: 34.425, lng: 8.7842 },
  { ville: 'Ariana', lat: 36.8662, lng: 10.1647 },
  { ville: 'La Marsa', lat: 36.8782, lng: 10.3249 },
  { ville: 'Le Bardo', lat: 36.8095, lng: 10.1237 },
  { ville: 'Monastir', lat: 35.777, lng: 10.8262 },
  { ville: 'Mahdia', lat: 35.5047, lng: 11.0622 },
  { ville: 'Nabeul', lat: 36.4561, lng: 10.7376 },
  { ville: 'Zarzis', lat: 33.503, lng: 11.1121 },
  { ville: 'Beja', lat: 36.7339, lng: 9.1846 },
  { ville: 'Kef', lat: 36.1742, lng: 8.7049 },
  { ville: 'Medenine', lat: 33.3549, lng: 10.5055 },
  { ville: 'Tataouine', lat: 32.9292, lng: 10.4518 },
  { ville: 'Tozeur', lat: 33.9197, lng: 8.1335 },
  { ville: 'Siliana', lat: 36.0849, lng: 9.3708 },
  { ville: 'Kasserine', lat: 35.1676, lng: 8.8306 },
  { ville: 'Jendouba', lat: 36.5029, lng: 8.7802 },
  { ville: 'Manouba', lat: 36.8082, lng: 10.0963 },
  { ville: 'Ben Arous', lat: 36.7531, lng: 10.2189 },
  { ville: 'Douz', lat: 33.4572, lng: 9.0214 },
  { ville: 'Hammamet', lat: 36.4041, lng: 10.6168 },
  { ville: 'El Jem', lat: 35.3006, lng: 10.7062 },
  { ville: 'Djerba', lat: 33.8076, lng: 10.8449 },
  { ville: 'Kelibia', lat: 36.847, lng: 11.0931 },
  { ville: 'El Kef', lat: 36.1742, lng: 8.7049 },
  { ville: 'Zaghouan', lat: 36.4021, lng: 10.1426 },
];


const ChangeMapView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], 13);
    }
  }, [coords, map]);
  return null;
};



const TrajetMap = ({
  setStartPlace,
  setEndPlace,
  setDistance,
  setTrajet,
  trajet,
}) => {
  const [selectedCity, setSelectedCity] = useState(villesTunisie[0]);
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);

  const mapRef = useRef(null);

  const fetchPlaceName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat: lat,
            lon: lon,
            format: 'json',
          },
        },
      );
      return {
        lat: lat,
        lng: lon,
        nom: response.data.display_name,
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du nom du lieu :', error);
      return null;
    }
  };

  const calculateDistance = (coordinates) => {
    let totalDistance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const pointA = L.latLng(coordinates[i].lat, coordinates[i].lng);
      const pointB = L.latLng(coordinates[i + 1].lat, coordinates[i + 1].lng);
      totalDistance += pointA.distanceTo(pointB); // Ajouter la distance entre les points
    }
    return totalDistance;
  };

  const handleTrajetCreated = async (e) => {
    const { layerType, layer } = e;
    if (layerType === 'polyline') {
      const coordinates = layer.getLatLngs();
      const latLngs = coordinates.map((coord) => ({
        lat: coord.lat,
        lng: coord.lng,
      }));
      setTrajet(coordinates);

      const startCoords = coordinates[0];
      const endCoords = coordinates[coordinates.length - 1];

      const startPlaceData = await fetchPlaceName(
        startCoords.lat,
        startCoords.lng,
      );
      const endPlaceData = await fetchPlaceName(endCoords.lat, endCoords.lng);

      if (startPlaceData) setStartPlace(startPlaceData);
      if (endPlaceData) setEndPlace(endPlaceData);

      const totalDistance = calculateDistance(latLngs);
      setDistance((totalDistance / 1000).toFixed(2));

      // Ajouter les marqueurs
      setStartMarker(startCoords); // Marqueur de départ
      setEndMarker(endCoords); // Marqueur d'arrivée
    }
  };

  const handleTrajetDeleted = (e) => {
    // Effacer les marqueurs lorsque le trajet est supprimé
    setStartMarker(null);
    setEndMarker(null);

    // Effacer le trajet en réinitialisant l'état
    setTrajet([]); // Assurez-vous de mettre à jour le trajet immédiatement
  };

  const handleCityChange = (e) => {
    const city = villesTunisie.find((v) => v.ville === e.target.value);
    setSelectedCity(city);
  };

  return (
    <div>
      <div>
        <label htmlFor="city-select">Choisissez une ville :</label>
        <select
          id="city-select"
          value={selectedCity.ville}
          onChange={handleCityChange}
        >
          {villesTunisie.map((ville, index) => (
            <option key={index} value={ville.ville}>
              {ville.ville}
            </option>
          ))}
        </select>
      </div>

      <MapContainer
        center={[selectedCity.lat, selectedCity.lng]}
        zoom={13}
        ref={mapRef}
        style={{ height: '50vh', width: '50vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView coords={selectedCity} />

        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleTrajetCreated}
            onDeleted={handleTrajetDeleted}
            draw={{
              polyline: {
                icon: new L.DivIcon({
                  iconSize: new L.Point(8, 8),
                  className: 'leaflet-div-icon leaflet-editing-icon',
                }),
                shapeOptions: {
                  guidelineDistance: 10,
                  color: 'navy',
                  weight: 3,
                },
              },
              rectangle: false,
              circlemarker: false,
              circle: false,
              polygon: false,
            }}
          />
        </FeatureGroup>

       

        {startMarker && (
          <Marker position={startMarker} icon={new L.Icon.Default()} />
        )}
        {endMarker && (
          <Marker position={endMarker} icon={new L.Icon.Default()} />
        )}
      </MapContainer>
    </div>
  );
};

export default TrajetMap;

