import styled from 'styled-components';

export const HeaderContainer = styled.header`
    &{
        background: #1f5582;
        width: 100%;
        height: 73px;
        display: flex;
        align-items: center;
    }
    
    div {
        margin-left: 19.3%;
        display: flex;
        align-items: center;
        flex-direction: row;

        h1 {
            margin: 0;
            color: #fff;
            font-size: 16px;
            font-family: 'Lato', sans-serif;
            font-weight: bold;
            padding: 25px 15px;
        }
    }

    img {
        display: block;
        height: 45px;
    }
`;