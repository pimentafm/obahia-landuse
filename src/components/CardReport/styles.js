import styled from 'styled-components';

export const ReportContainer = styled.div`
    & {
      right: 0px;
      flex-direction: column;
      position: absolute;
      z-index: 3;
      width: 60%;
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

    .showhide-report {
      position: absolute;
      right: 0px;

      display: flex;
        flex-direction: column;

        svg {
            position: relative;
            float: right;
            transform: translateX(
                ${({ isHidden }) => (isHidden ? -100 : 0)}pc
            );
            transition: 0.3s;
            background: #fff;
            box-shadow: ${({ isHidden }) => (isHidden ? `0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05)` : 0)}px
        }
    }
`;