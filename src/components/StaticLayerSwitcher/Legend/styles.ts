import styled, { keyframes } from 'styled-components';

interface ContainerProps {
  isvisible: boolean;
}

const appearFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
    display: 'block';
  }
  to {
    opacity: 1;
    transform: translateY(0);
    display: 'none';
  }
`;

const desappearFromTop = keyframes`
  from {
    opacity: 1;
    transform: translateY(-5px);
    display: 'node';
  }
  to {
    opacity: 0;
    transform: translateY(0);
    display: 'block';
  }
`;

export const Container = styled.div<ContainerProps>`
  list-style: none;
  color: #000;

  ${props => (props.isvisible ? `display: inline-block;` : `display: none;`)}
  animation: ${props =>
    props.isvisible ? appearFromTop : desappearFromTop} 1s;
`;
