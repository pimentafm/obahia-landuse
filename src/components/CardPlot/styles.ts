import styled from 'styled-components';

interface ContainerProps {
  ishidden: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  right: 0px;
  background: #fff;

  min-width: 400px;
  width: 30vw;
  position: absolute;
  z-index: 1;

  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.13), 1px 2px 2px rgba(0, 0, 0, 0.1),
    -1px -2px 2px rgba(0, 0, 0, 0.05);

  transform: translateX(${({ ishidden }) => (ishidden ? 720 : 0)}px);
  transition: 0.3s;

  @media (min-width: 3840px){
      transform: translateX(${({ ishidden }) => (ishidden ? 1160 : 0)}px);
      transition: 0.3s;
    }

  #handleCardplot {
    position: fixed;
    z-index: 1;
    left: 5px;

    transform: translateX(${({ ishidden }) => (ishidden ? -350 : 0)}px);
    transition: 0.3s;

    @media (min-width: 1920px){
      transform: translateX(${({ ishidden }) => (ishidden ? -180 : 0)}px);
      transition: 0.3s;
    }

    @media (min-width: 3840px){
      transform: translateX(${({ ishidden }) => (ishidden ? -50 : 0)}px);
      transition: 0.3s;
    }

    svg {
      margin-top: 5px;
      border-radius: 2px;
      background: #fff;
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.13),
        1px 2px 2px rgba(0, 0, 0, 0.1), -1px -2px 2px rgba(0, 0, 0, 0.05);
    }
  }
`;
