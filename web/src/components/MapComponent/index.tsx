import React from 'react';
import Leaflet from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';

import marker from '../../assets/images/marker.svg';
import 'leaflet/dist/leaflet.css';

import { Popup } from './styles';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}
interface MapProps {
  darkTheme: boolean;
  style: object;
  orphanages?: Orphanage[];
}

const mapIcon = Leaflet.icon({
  iconUrl: marker,
  iconSize: [58, 68],
  iconAnchor: [29, 68],

  popupAnchor: [170, 2],
});
const MapComponent = (props: MapProps) => {
  const { darkTheme, style, orphanages } = props;
  return (
    <Map center={[-23.8069824, -45.3649479]} zoom={15} style={style}>
      <button>Teste</button>
      {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      {/* Mais temas em: https://docs.mapbox.com/mapbox-gl-js/api/map/ */}
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/${
          darkTheme
            ? 'navigation-guidance-night-v4'
            : 'navigation-guidance-day-v4'
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${
          process.env.REACT_APP_MAPBOX_TOKEN
        }`}
      />
      {orphanages &&
        orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240}>
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
    </Map>
  );
};
export default MapComponent;
