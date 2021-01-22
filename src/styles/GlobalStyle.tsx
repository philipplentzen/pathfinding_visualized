import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @keyframes test {
    from {transform: scale(0)}
    to {transform: scale(1)}
  }
        
  :root {
    --background: #ffffff;
    --background-dark: #fafafa;
    --border: 1px solid rgba(0, 0, 0, 0.06);
    --shadow: 0 6px 16px -8px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03);
  }
`;