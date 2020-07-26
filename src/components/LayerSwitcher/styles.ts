import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 2px;
  border-color: #d9d9d9;
  padding: 5px;
  margin-top: 10px;

  .layer-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .slider-switcher {
    display: flex;
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
