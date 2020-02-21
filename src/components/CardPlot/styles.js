import styled from 'styled-components';

export const CardContainer = styled.div`
    & {
      top: 30px;
      right: 10px;
      flex-direction: column;
      position: absolute;
      z-index: 1;

      transform: translateX(
            ${({ areHidden }) => (areHidden ? 720 : 0)}px
        );
        transition: 0.3s;
    }

    .showhide-plots {
      position: absolute;
      z-index: 2;
      right: 0px;

      display: flex;
        flex-direction: column;

        svg {
            position: relative;
            float: right;
            transform: translateX(
                ${({ areHidden }) => (areHidden ? -720 : 0)}px
            );
            transition: 0.3s;
            background: #fff;
            box-shadow: ${({ areHidden }) => (areHidden ? `0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05)` : 0)}px
        }
    }
`;