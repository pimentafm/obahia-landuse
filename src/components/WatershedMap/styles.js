import styled from 'styled-components';

export const MapContainer = styled.div`
    & {
        width: 100%;
        height: calc(100% - 105px);
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