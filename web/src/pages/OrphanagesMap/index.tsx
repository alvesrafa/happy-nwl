import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { BsSun, BsMoon } from 'react-icons/bs';

import { Container } from './styles';

import MapComponent from '../../components/MapComponent';
import marker from '../../assets/images/marker.svg';
import api from '../../services/api';
interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}
const OrphanagesMap = () => {
  const [mapTheme, setMapTheme] = useState(false);
  const toggleMapTheme = () => {
    setMapTheme(!mapTheme);
  };
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const getAllOrphanages = async () => {
    try {
      const response = await api.get('orphanages');

      if (response.data.success) {
        setOrphanages(response.data.content);
      }
    } catch (e) {
      console.log('Erro Ao buscar orfanatos');
    }
  };
  useEffect(() => {
    getAllOrphanages();
  }, []);
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

      <MapComponent
        style={{ width: '100%', height: '100%' }}
        darkTheme={mapTheme}
        orphanages={orphanages}
      />

      <Link to="/orphanages/create">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </Container>
  );
};

export default OrphanagesMap;
