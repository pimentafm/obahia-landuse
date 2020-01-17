import styled from 'styled-components';

export const ZoomContainer = styled.div`
    margin-top: 25px;;
    left: 305px;
    position: fixed;
    z-index: 1;

    .zoom-controls {
        background: #fff;
        box-shadow: 0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05);
        transform: translateX(
            ${({ isHidden }) => (isHidden ? -300 : 0)}px
        );
        transition: 0.3s;
    }
`;