import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        -webkit-font-smoothing: antialiased;
        display: flex;
        flex-direction: column;
        font-family: 12px Roboto, sans-serif;
    }

    .custom-mouse-position {
        position: fixed;
        right: 10px;
        margin-top: 10px;
        text-align: center;
        padding: 10px;
        padding: 10px;
        display: flex;
        flex: 1;
        font-size: 20px;
        color: #000;
        text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;
    }

    .toast-class {
        color: #fff;
        font-size: 16px;
    }
`;