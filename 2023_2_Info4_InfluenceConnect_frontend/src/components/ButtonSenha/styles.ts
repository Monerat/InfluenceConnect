import styled from "styled-components";

export const StyledButtonSenha = styled.button<{ $darkMode: boolean }>`
  position: absolute;
  right: 35px;
  top: 51%;
  color: ${(props) => (props.$darkMode ? "#060606" : "#da2fbe")};
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
`;
