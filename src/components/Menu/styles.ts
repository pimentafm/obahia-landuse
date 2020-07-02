import styled from 'styled-components';
import { animated } from 'react-spring';
import { lighten } from 'polished';
interface ContainerProps {
  ishidden: number;
}

export const Container = styled(animated.div)<ContainerProps>`
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.13), 1px 0px 2px rgba(0, 0, 0, 0.1),
    -1px 0px 2px rgba(0, 0, 0, 0.05);
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 300px;
  text-decoration: none;

  & {
    transform: translateX(${({ ishidden }) => (ishidden ? -300 : 0)}px);
    transition: 0.3s;
  }
`;

export const Header = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: #1f5582;

  img {
    height: 40px;
    padding: 2px;
  }

  svg {
    cursor: pointer;
    position: relative;
    right: 5px;
    transform: translateX(${({ ishidden }) => (ishidden ? 35 : 0)}px);
    transition: 0.3s;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.13), 1px 2px 2px rgba(0, 0, 0, 0.1),
      -1px -2px 2px rgba(0, 0, 0, 0.05);
  }
`;

export const Footer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 30px;

  background: #1f5582;

  svg {
    margin-left: 5px;
  }

  svg:hover {
    transition: fill 0.3s ease;
    fill: ${lighten(0.5, '#1f5582')};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  text-decoration: none;

  > label {
    padding-top: 5px;
  }

  .static-layers {
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-radius: 2px;
    border-color: #d9d9d9;
    padding: 5px;
    margin-top: 10px;
  }
`;
