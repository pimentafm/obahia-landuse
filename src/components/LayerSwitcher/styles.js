import styled from 'styled-components';


export const LayerContainer = styled.div`
    & {
        border: 1px solid;
        border-radius: 5px;
        border-color: #d9d9d9;
        padding: 5px;
        margin-top: 10px;
    }
 
    .layer-div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        padding: 2px;
    }
    
    label {
        color: #000;
        margin-top: 0;
    }

    .ant-switch-checked {
        background-color: #1f5582;
    }

    li {
        display: ${({ legend_is_visible }) => (legend_is_visible ? 'block' : 'none') };
    }
    
`;