import styled from 'styled-components';

export const ReportContainer = styled.div`
    & {
      right: 0px;
      flex-direction: column;
      position: absolute;
      z-index: 3;
      width: 40%;
      height: 95%;

      transform: translateX(
            ${({ isHidden }) => (isHidden ? 100 : 0)}pc
      );
      transition: 0.3s;
    }

    .class-report {
        height: 100%;
        width: 100%;
    }
`;