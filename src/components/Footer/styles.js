import styled from 'styled-components';

export const FooterContainer = styled.footer`
    & {
        background: #fff;
        position: fixed;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        box-shadow: 0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05);
        bottom: 0;
        width: 100%;
        height: 30px;
        z-index: 2;
    }

    label {
        padding-left: 10px;
        margin-right: 10px;
    }

    #mouse-position-coordinates {
        width: 250px;
        margin: 5px 5px 5px 5px;
        height: 25px;
        vertical-align: middle;
        text-align: center;
        background-color: #f2f2f2;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        padding: 2px;
    }
`;