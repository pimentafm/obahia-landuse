import styled from 'styled-components';
import { lighten } from 'polished';

interface ContainerProps {
  ishidden: number;
}

export const Container = styled.div<ContainerProps>`
  align-items: center;
  left: 306px;
  vertical-align: center;
  padding: 2px;
  left: 306px;
  top: 5px;
  border-radius: 5px;
  background: #ffffff80;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.13), 1px 0px 2px rgba(0, 0, 0, 0.1),
    -1px 0px 2px rgba(0, 0, 0, 0.05);
  position: fixed;

  & {
    transform: translateY(${({ ishidden }) => (ishidden ? 40 : 0)}px);
    transition: 0.3s;
  }

  svg:hover {
    transition: fill 0.3s ease;
    fill: ${lighten(0, '#1f5582')};
  }
`;
