import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 30px;
  position: fixed;

  width: 100%;
  height: 100%;

  grid-template-areas:
    'map'
    'footer';

  #map {
    grid-area: map;
  }

  #footer {
    grid-area: footer;
  }
`;
