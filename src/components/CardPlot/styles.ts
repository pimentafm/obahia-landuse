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

  transform: translateX(${({ ishidden }) => (ishidden ? 40 : 0)}px);
  transition: 0.3s;

  @media screen and (max-width: 4096px) {
    transform: translateX(${({ ishidden }) => (ishidden ? 30 : 0)}vw);
    transition: 0.3s;
  }

  @media screen and (max-width: 3840px) {
    transform: translateX(${({ ishidden }) => (ishidden ? 30 : 0)}vw);
    transition: 0.3s;
  }

  @media screen and (max-width: 1280px) {
    transform: translateX(${({ ishidden }) => (ishidden ? 51 : 0)}vh);
    transition: 0.3s;
  }

  /* IPhone Pro*/
  @media screen and (max-width: 1024px) {
    transform: translateX(${({ ishidden }) => (ishidden ? 30 : 0)}vh);
    transition: 0.3s;
  }

  @media screen and (max-width: 992px) {
    transform: translateX(${({ ishidden }) => (ishidden ? 41 : 0)}vh);
    transition: 0.3s;
  }

  /* Pixel 2, IPhone 6/7/8 plus*/
  @media screen and (max-width: 414px) {
    transform: translateX(${({ ishidden }) => (ishidden ? 55 : 0)}vh);
    transition: 0.3s;
  }

  #handleCardplot {
    position: absolute;
    z-index: 1;
    left: 5px;

    transform: translateX(${({ ishidden }) => (ishidden ? -42 : 0)}px);
    transition: 0.3s;

    svg {
      cursor: pointer;
      margin-top: 5px;
      border-radius: 2px;
      background: #fff;
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.13),
        1px 2px 2px rgba(0, 0, 0, 0.1), -1px -2px 2px rgba(0, 0, 0, 0.05);
    }
  }
`;
