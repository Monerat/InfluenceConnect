import { createGlobalStyle, styled } from "styled-components";

export const Dark = "#f2f2f2";
export const subDark = "#e8e8e8";

export const Light = "#2f2f2f";
export const subLight = "#212121";

export const GlobalStyle = createGlobalStyle`

    * {

      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'DMSans', Verdana, Geneva, Tahoma, sans-serif;
      text-decoration: none;
    }
`;

export const Formulario = styled.form<{
  $fontSizeLabel: string;
  $darkMode: boolean;
}>`
  width: 40%;
  background: linear-gradient(105deg, #6d22f5, #da2fbe, #e94c50, #f8d347) fixed;
  display: flex;
  flex-direction: column;
  align-items: center;

  fieldset {
    background: ${(props) => (props.$darkMode ? Dark : Light)};
    border: 2px solid ${(props) => (props.$darkMode ? Light : Dark)};
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem;
    margin-bottom: 2rem;
    border-radius: 8px;

    legend {
      background-color: ${(props) => (props.$darkMode ? Dark : Light)};
      color: ${(props) => (props.$darkMode ? Light : Dark)};
      font-size: ${(props) => props.$fontSizeLabel};
      text-transform: capitalize;
      margin: 0.5rem;
      margin-top: 2rem;
      transform: translateY(-18px);
      padding: 8px;
      border-radius: 8px 8px 0 0;
      border: 2px solid ${(props) => (props.$darkMode ? Light : Dark)};
      border-bottom: none;
    }

    .campo {
      font-size: ${(props) => props.$fontSizeLabel};
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
      padding: 0.4rem;

      label {
        color: ${(props) => (props.$darkMode ? Light : Dark)};
        text-align: left;
      }

      input {
        font-size: ${(props) => props.$fontSizeLabel};
        border: none;
        border-bottom: 2px solid ${(props) => (props.$darkMode ? Light : Dark)};
        color: ${(props) => (props.$darkMode ? Light : Dark)};
        width: 100%;
        height: 30px;
        background: transparent;
        margin-bottom: 0.5rem;
        padding: 0.2rem;
      }
    }

    span {
      color: #e94c50;
      font-style: italic;
      text-align: right;
      text-decoration: underline;
    }

    .redesSociais {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
  }

  .butoes {
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    margin-bottom: 24px;
  }

  .buttonAdicionar,
  .buttonRemover {
    color: ${(props) => (props.$darkMode ? Light : Dark)};
    background-color: #e94c50;
    width: 35%;
    height: 100%;
    margin: 20px;
    padding: 5px;
    border-radius: 4px;
    border: none;
    font-size: ${(props) => props.$fontSizeLabel};
    cursor: pointer;
  }

  select {
    color: ${(props) => (props.$darkMode ? Light : Dark)};
    background-color: #e94c50;
    padding: 4px;
    border-radius: 4px;
    text-transform: uppercase;

    option {
      background: ${(props) => (props.$darkMode ? Dark : Light)};
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Background = styled.div`

    background: #00000083;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

export const Border = styled.div`

  animation: aparecer 0.7s ease-in-out;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(105deg, #6D22F5, #DA2FBE);
  border-radius: 8px;

  @keyframes aparecer {
    
    from {

      opacity: 0;
      transform: translateY(-200px);
    }
  }
`

export const Container = styled.div<{ $darkMode: boolean, $fontSize: string }>`

    background: ${props => props.$darkMode ? Dark : Light};
    width: 99%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 4px;
    padding: 20px;
    gap: 12px;
    border-radius: 8px;

    h2 {

        color: ${props => props.$darkMode ? Light : Dark};
        font-size: ${props => props.$fontSize};
        font-style: italic;
        text-align: center;
    }

    .butoes {

        display: flex;
        gap: 24px;
        padding: 12px;
    }
` 
