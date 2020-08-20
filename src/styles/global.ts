import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body {
    background: #fff;
    color: #000;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    height: 100%;
  }

  border-style, input, button, span {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    font-size: 18px;
  }

  button {
    cursor: pointer;
  }

  label {
    font-weight: 500;
  }

  a {
    color: #1f5582;
  }

  .ant-slider-track {
    background-color: #1f5582;
  }

  .ant-slider-rail {
    background-color: #888;
  }
  
  .ant-slider-handle{
    border-color: #1f5582;
  }

  .ant-popover-title, .ant-popover-inner-content{
    color: #1f5582;
  }

  .zoom-controls {
    background: #ffffff;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.13), 1px 2px 2px rgba(0, 0, 0, 0.1),
      -1px -2px 2px rgba(0, 0, 0, 0.05);
  }
  .zoom-controls {
    &:hover {
      background: #ffffff;
    }
  }

`;
