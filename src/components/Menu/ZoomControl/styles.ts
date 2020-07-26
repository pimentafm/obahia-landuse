import styled from 'styled-components';

interface ContainerProps {
  ishidden: number;
}

export const Container = styled.div<ContainerProps>`
  left: 306px;
  position: fixed;
  button {
    background: #1f5582;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.13), 1px 2px 2px rgba(0, 0, 0, 0.1),
      -1px -2px 2px rgba(0, 0, 0, 0.05);
  }
  & {
    transform: translateY(${({ ishidden }) => (ishidden ? 40 : 0)}px);
    transition: 0.3s;
  }
`;
