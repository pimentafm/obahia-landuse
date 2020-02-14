import styled from "styled-components";

export const MapContainer = styled.div`
  & {
    width: 100%;
    height: calc(100% - 115px);
    position: fixed;

    .plot-card {
      top: 10px;
      right: 10px;
      flex-direction: column;
      position: absolute;
      z-index: 1;
    }
  }
`;