import styled from 'styled-components';
import { lighten } from 'polished';

interface ContainerProps {
  ishidden: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;

  left: 308px;
  top: 5px;
  background: #fff;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.13), 1px 0px 2px rgba(0, 0, 0, 0.1),
    -1px 0px 2px rgba(0, 0, 0, 0.05);
  position: fixed;
  z-index: 2;
  height: 30px;
  text-decoration: none;

  & {
    transform: translateX(${({ ishidden }) => (ishidden ? 40 : 0)}px);
    transition: 0.3s;
  }

  svg + * {
    margin-left: 10px;
  }

  svg:hover {
    transition: fill 0.3s ease;
    fill: ${lighten(0.5, '#1f5582')};
  }
`;
