import styled from "styled-components";
import { Dark, Light } from "../../GlobalStyle";

export const HeaderContent = styled.div<{
  $darkMode: boolean;
  $fontSize: string;
}>`
  background: ${(props) => (props.$darkMode ? Dark : Light)};
  min-height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border-bottom: 2px solid #6d22f5;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    .logo {
      width: 100%;

      img {
        max-width: 100%;
        height: auto;
      }
    }

    .saudacoes {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 20px;

      button {
        border: none;
        font-weight: bold;
        background-color: transparent;
        color: ${(props) => (props.$darkMode ? Light : Dark)};
        font-size: ${(props) => props.$fontSize};
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
        &:focus {
          text-decoration: underline;
        }
      }

      .menuHamburger {
        display: none;

        @media screen and (max-width: 768px) {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          &:hover {
            transform: scale(1.2);
            transition: 0.7s;
          }
        }
      }

      @media screen and (max-width: 768px) {
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .botao-diminuir,
    .botao-aumentar,
    .botao-contraste {
    }

    .botoes {
      display: flex;
      gap: 0.3em;
      align-items: center;
      @media (max-width: 768px) {
        display: none;
      }
    }

    #icone-contraste {
      width: 25px;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }
`;
