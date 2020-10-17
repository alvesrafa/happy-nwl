import styled from 'styled-components';

import { Popup as Pop } from 'react-leaflet';

export const Popup = styled(Pop)`
  .leaflet-popup-content-wrapper {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: none;
  }
  .leaflet-popup-tip-container {
    display: none;
  }
  .leaflet-popup-content {
    color: #0089a5;
    font-size: 20px;
    font-weight: bold;
    margin: 8px 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    > a {
      width: 40px;
      height: 40px;
      background: #15c3d6;
      box-shadow: 17.2868px 27.6589px 41.48884px rgba(23, 142, 166, 0.16);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
