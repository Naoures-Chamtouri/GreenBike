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
import L from 'leaflet';

const ChangeMapView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], 12.5);
    }
  }, [coords, map]);
  return null;
};

const SimpleMap = ({ trajet }) => {
 
  const [selectedCity, setSelectedCity] = useState(trajet[0]);
  const [startMarker, setStartMarker] = useState(trajet[0]);
  const [endMarker, setEndMarker] = useState(trajet[trajet.length - 1]);

  const mapRef = useRef(null);

  return (
    <div>
      <MapContainer
        center={[selectedCity.lat, selectedCity.lng]}
        zoom={13}
        ref={mapRef}
        style={{ height: '40vh', width: '60vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView coords={selectedCity} />
        <Polyline
          positions={trajet.map((point) => [point.lat, point.lng])}
          color="navy"
        />

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

export default SimpleMap;
