import styled from "styled-components";
import background from "../../assets/img/backgroundlogin.png";

import { Dark, Light } from "../../GlobalStyle";
import { Link } from "react-router-dom";

const gradientStart = "#DA2FBE";
const gradientEnd = "#6D22F5";

export const StyledSignin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
`;

export const BackgroundImage = styled.div`
  background: url(${background}) center/cover no-repeat;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const Rectangle = styled.form<{ $background: boolean }>`
  background: ${(props) => (props.$background ? "#f2f2f2f5" : "#2f2f2ffa")};
  color: ${(props) => (props.$background ? Dark : Light)};
  width: 28.1875rem;
  height: 98vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 0;
  margin-top: 2rem;
  border-radius: 0.75rem 0rem 0rem 0.75rem;

  @media (max-width: 768px) {
    width: 80%;
    height: auto;
    margin: 10vh auto;
    border-radius: 0.75rem;
    position: relative;

    h2 {
      font-size: 1rem;
    }

    input {
      padding: 0.5rem;
    }

    button {
      height: 3rem;
    }
  }
`;

export const Logo = styled.img`
  width: 100%;
  max-width: 29.1875rem;
  height: auto;
  margin-top: 10rem;

  @media (min-width: 320px) and (max-width: 768px) {
    margin-top: 2rem;
  }
`;

export const Title = styled.h1<{ $darkMode: boolean }>`
  width: 100%;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 1rem;
  color: ${(props) => (props.$darkMode ? Light : Dark)};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const InputContainer = styled.div<{
  $darkMode: boolean;
  $fontSizeSpan: string;
}>`
  width: 100%;
  margin-bottom: 2rem;

  div {
    margin-bottom: 1rem;

    label {
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: ${(props) => (props.$darkMode ? "#000000" : "#ffffff")};
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: none;
      background: linear-gradient(to right, ${gradientStart}, ${gradientEnd})
        bottom no-repeat;
      background-size: 100% 3px;
      color: ${(props) => (props.$darkMode ? "#000" : "#fff")};
      font-size: 1rem;
      outline: none;

      &:focus {
        border: 2px solid #da2fbe;
        box-shadow: 0 0 5px rgba(218, 47, 190, 0.5);
      }
    }
  }

  .login-input {
    margin-bottom: 5rem;
  }

  .senha-input {
    margin-bottom: rem;
  }

  span {
    font-size: ${(props) => props.$fontSizeSpan};
    font-style: italic;
    color: #e74b50;
    text-decoration: none;
    font-weight: bold;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    .login-input {
      margin-bottom: 2rem;
    }

    .senha-input {
      margin-bottom: 1rem;
    }
  }
`;

export const Button = styled.button<{ $darkMode: boolean }>`
  width: 15rem;
  height: 4.22675rem;
  border-radius: 0.5rem;
  border: 1px solid #da2fbe;
  background: rgba(0, 0, 0, 0);
  color: ${(props) => (props.$darkMode ? "#060606" : "#da2fbe")};
  font-size: 1.25rem;
  font-weight: 400;
  line-height: normal;
  transition: background 0.3s, color 0.3s;

  &:hover {
    color: ${(props) => (props.$darkMode ? "#da2fbe" : "#FFF")};
    background: ${(props) => (props.$darkMode ? "#FFF" : "#da2fbe")};
  }

  &:focus {
    outline: none;
    border: 2px solid #da2fbe;
    box-shadow: 0 0 5px rgba(218, 47, 190, 0.5);
  }
`;

export const SenhaInputContainer = styled.div`
  position: relative;
`;

export const LinkCadastro = styled(Link)<{ $darkMode: boolean }>`
  font-size: 1rem;
  color: ${(props) => (props.$darkMode ? "#060606" : "#da2fbe")};
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #6d22f5;
  }

  .link-cadastro {
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }

  &:focus {
    outline: none;
    border: 2px solid #da2fbe;
    box-shadow: 0 0 5px rgba(218, 47, 190, 0.5);
  }
`;
