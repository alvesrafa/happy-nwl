import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from './assets/styles/GlobalStyles';

import Routes from './routes';

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyles />
      <Routes />
    </>
  );
}

export default App;
