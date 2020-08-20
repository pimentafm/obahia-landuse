import styled from 'styled-components';
import { lighten } from 'polished';

interface ContainerProps {
  ishidden: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2px;
  left: 306px;
  top: 95px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.13), 1px 0px 2px rgba(0, 0, 0, 0.1),
    -1px 0px 2px rgba(0, 0, 0, 0.05);
  position: fixed;
  z-index: 2;
  text-decoration: none;
  & {
    transform: translateY(${({ ishidden }) => (ishidden ? 40 : 0)}px);
    transition: 0.3s;
  }
  svg + * {
    margin-top: 10px;
  }
  svg:hover {
    transition: fill 0.3s ease;
    fill: ${lighten(0, '#1f5582')};
  }
`;
