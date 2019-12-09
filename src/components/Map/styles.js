import styled from 'styled-components';

export const MapContainer = styled.div`
    & {
        width: 100%;
        height: calc(100% - 115px);
        position: fixed;
    }


    .zoom-controls {
        background: #fff;
        box-shadow: 0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05);
    }
    
`;
