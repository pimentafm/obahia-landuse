import styled from 'styled-components';

export const Container = styled.footer`
  & {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    height: 30px;
    background: #fff;
    z-index: 1;

    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.13), 1px 2px 2px rgba(0, 0, 0, 0.1),
      -1px -2px 2px rgba(0, 0, 0, 0.05);

    label {
      padding-left: 10px;
      padding-right: 5px;
    }

    #mouse-position-coordinates {
      width: 250px;
      height: 25px;
      text-align: center;
      padding-top: 3px;
      vertical-align: middle;
      background-color: #f2f2f2;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    }
  }
`;
