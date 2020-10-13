import React, { useState } from 'react';

import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

interface MapProps {
  darkTheme: boolean;
}

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
    </Map>
  );
};
export default MapComponent;
