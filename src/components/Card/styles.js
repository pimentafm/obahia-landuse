import styled from 'styled-components';

export const Container = styled.div`
    & {
        background: #fff;
        margin-top: 100px;
        margin-left: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05) ;
        position: absolute;
        z-index: 1;
        width: 300px;
    }

    select {
        padding: 5px;
        width: 100%;
    }

    label {
        color: #888;
        margin-bottom: 0;
        border-radius: 0;
        margin-top: 10px;
    }

    #icon {
        position: relative;
        top: 5px;
    }
    #help-button {
        -webkit-appearance: none;
        background: #7bc4eb;
        border-radius: 2px;
        border: 0;
        width: 30px;
        height: 30px;
        cursor: pointer;
        text-decoration: none;
        vertical-align: middle;
    }

    #help-button:hover {
        background: #1f5582;
        transition: 0.3s;
    }

    #label-title {
        color: black;
        font-size: 18px;
    }

    #div-title {
        display: flex;
        margin-bottom: 10px;
        align-content: center;
        text-align: center;
    }
`;