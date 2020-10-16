import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import logo from '../../assets/images/logo.svg';

const Landing = () => {
  return (
    <Container>
      <div className="content-wrapper">
        <img src={logo} alt="Happy" />
        <main>
          <h1>Leve felicidade para o mundo!</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>
        <div className="location">
          <strong>Ilhabela</strong>
          <span>São Paulo</span>
        </div>
        <Link to="map" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </div>
    </Container>
  );
};

export default Landing;
