import { createGlobalStyle } from 'styled-components';
import colors from 'config/colors';
import reset from 'styled-reset';

const baseStyles = createGlobalStyle`
    ${reset}
    html, body {
        width: 100%;
        height: 100%;
        position: relative;
        font-size: 14px;
        color: ${colors.TEXT};
    }

    * , *:before , *:after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
        padding: 0;
    }

    *::selection, *::-moz-selection, *:focus, *:active, *:active:focus,  {
        outline: 0 !important;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    a:focus,
    button:focus,
    input:focus,
    textarea:focus {
        outline: 0;
    }
`;

export default baseStyles;
