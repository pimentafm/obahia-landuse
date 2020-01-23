import styled from 'styled-components';

export const MenuContainer = styled.div`
    & {
        background: #fff;
        padding: 10px 5px 10px 10px;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05);
        position: absolute;
        z-index: 1;
        height: 100%;
        width: 300px;
        text-decoration: none;
    }

    & {
        transform: translateX(
            ${({ isHidden }) => (isHidden ? -300 : 0)}px
        );
        transition: 0.3s;
    }

    select {
        text-decoration: none;
        padding: 5px;
        width: 100%;
    }

    .nav {
        display: flex;
        flex-direction: column;

        svg {
            position: relative;
            float: right;
            transform: translateX(
                ${({ isHidden }) => (isHidden ? 35 : 0)}px
            );
            transition: 0.3s;
            background: #fff;
            box-shadow: ${({ isHidden }) => (isHidden ? `0px 2px 3px rgba(0,0,0,.13) ,1px 2px 2px rgba(0,0,0,.1) , -1px -2px 2px rgba(0,0,0,.05)` : 0)}px
        }
    }

    label {
        color: #888;
        margin-bottom: 0;
        border-radius: 0;
        margin-top: 10px;
    }
`;