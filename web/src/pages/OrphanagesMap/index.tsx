import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { BsSun, BsMoon } from 'react-icons/bs';
import { Container } from './styles';

import MapComponent from '../../components/MapComponent';

import marker from '../../assets/images/marker.svg';

const OrphanagesMap = () => {
  const [mapTheme, setMapTheme] = useState(false);
  const toggleMapTheme = () => {
    setMapTheme(!mapTheme);
  };

  return (
    <Container>
      <aside>
        <header>
          <img src={marker} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Ilhabela</strong>
          <span>São Paulo</span>

          <button
            className={mapTheme ? 'dark' : 'light'}
            onClick={toggleMapTheme}
          >
            {mapTheme ? <BsMoon size={32} /> : <BsSun size={32} />}
          </button>
        </footer>
      </aside>

      <MapComponent darkTheme={mapTheme} />

      <Link to="/orphanages/create">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </Container>
  );
};

export default OrphanagesMap;
