import styled from 'styled-components';

export const FooterContainer = styled.footer`
    & {
        background: #fff;
        position: fixed;
        margin: 1px 1px 1px 1px;
        display: flex;
        flex-direction: row;
        text-decoration: none;
        box-shadow: 0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05) ;
        padding: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        z-index: 1;
    }

    label {
        padding-left: 10px;
        margin-bottom: 0;
        border-radius: 0;
        margin-top: 10px;
    }

    .select {
        padding: 2px;
    }

    #unit-select {
        width: 100px;
    }
    #proj-select {
        width: 120px;
    }
`;