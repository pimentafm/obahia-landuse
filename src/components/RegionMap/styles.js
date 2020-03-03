import styled from "styled-components";

export const MapContainer = styled.div`
  & {
    width: 100%;
    height: 100%;
    position: fixed;
  }

  #loading {
        position: fixed;
        z-index: 3;
        right: 50%;
        top: 50%;
    }
`;