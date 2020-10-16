import React, { useState } from 'react';
import Leaflet from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';

import marker from '../../assets/images/marker.svg';
import 'leaflet/dist/leaflet.css';

import { PopUp } from './styles';

interface MapProps {
  darkTheme: boolean;
}

const mapIcon = Leaflet.icon({
  iconUrl: marker,
  iconSize: [58, 68],
  iconAnchor: [29, 68],

  popupAnchor: [170, 2],
});
const MapComponent = (props: MapProps) => {
  const { darkTheme } = props;
  return (
    <Map
      center={[-23.8069824, -45.3649479]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
    >
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
      <Marker icon={mapIcon} position={[-23.8069824, -45.3649479]}>
        <PopUp closeButton={false} minWidth={240} maxWidth={240}>
          Nome do orfanato
          <Link to="/orphanages/1">
            <FiArrowRight size={20} color="#FFF" />
          </Link>
        </PopUp>
      </Marker>
    </Map>
  );
};
export default MapComponent;
