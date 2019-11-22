import styled from 'styled-components';

export const Container = styled.div`
    background: #fff;
    margin-top: 150px;
    margin-left: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05) ;
    position: absolute;
    z-index: 1;
    width: 300px;

    #select {
        padding: 5px;
        width: 100%;
    }
`;