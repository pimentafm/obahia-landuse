import styled from 'styled-components';

export const MapContainer = styled.div`
    & {
        width: 100%;
        height: 100%;
        position: fixed;

        .plot-card {
            top: 30px;
            right: 10px;
            flex-direction: column;
            position: absolute;
            z-index: 1;
        }
    }
`;