import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  margin-bottom: 2px;

  .layer-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .layer-info {
    display: flex;
    flex-direction: row;

    align-content: center;

    > svg {
      margin-right: 10px;
    }

    > svg:hover {
      transition: fill 0.3s ease;
      fill: ${lighten(0.1, '#1f5582')};
    }
  }
`;
