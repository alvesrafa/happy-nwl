import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;

  display: flex;

  > aside {
    width: 440px;
    background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
    padding: 80px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > header {
      > h2 {
        font-size: 40px;
        font-weight: 800;
        line-height: 42px;
        margin-top: 64px;
      }
      > p {
        line-height: 28px;
        margin-top: 24px;
      }
    }
    > footer {
      display: flex;
      flex-direction: column;
      line-height: 24px;
      > strong {
        font-weight: 800;
      }
      > button {
        background: transparent;
        border: 0;
        width: 56px;
        height: 56px;
        border-radius: 16px;
        margin-top: 12px;
        cursor: pointer;
        &:focus {
          outline: 0;
        }
        &.dark {
          > svg path {
            fill: #222;
          }
        }
        &.light {
          > svg path {
            fill: #fbe35f;
          }
        }
      }
    }
  }
  > a {
    z-index: 10;
    position: absolute;
    right: 40px;
    bottom: 40px;
    width: 64px;
    height: 64px;
    background: #15c3d6;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background 0.2s;
    &:hover {
      background: #17d6eb;
    }
  }
  .leaflet-container {
    z-index: 5;
  }
`;
