import styled from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  ishidden: number;
}

export const Container = styled(animated.div)<ContainerProps>`
  background: #fff;
  padding: 5px 5px 5px 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.13), 1px 0px 2px rgba(0, 0, 0, 0.1),
    -1px 0px 2px rgba(0, 0, 0, 0.05);
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 300px;
  text-decoration: none;

  & {
    transform: translateX(${({ ishidden }) => (ishidden ? -300 : 0)}px);
    transition: 0.3s;
  }

  .nav {
    svg {
      cursor: pointer;
      position: relative;
      float: right;
      transform: translateX(${({ ishidden }) => (ishidden ? 35 : 0)}px);
      transition: 0.3s;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.13),
        1px 2px 2px rgba(0, 0, 0, 0.1), -1px -2px 2px rgba(0, 0, 0, 0.05);
    }
  }
`;