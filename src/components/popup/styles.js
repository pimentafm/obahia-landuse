import styled from "styled-components";

export const PopupContainer = styled.table`
  & {
    position: absolute;
    border-radius: 0px;
    padding: 2px;
    align-items: center;
    justify-content: center;
    border: 1px solid #cccccc;
    padding: 5px;
    min-width: 280px;
    z-index: 3;
  }

  tbody {
    background: #ccc;
    box-shadow: 0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05);
  }
  
  th, td {
    background: #fff;
    padding: 2px;
  }
`;