import styled from 'styled-components';

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
`;
