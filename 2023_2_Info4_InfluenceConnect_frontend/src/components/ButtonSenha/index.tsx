import React, { useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { StyledButtonSenha } from "./styles";
import { ThemeContext } from "../../context/themeContext";

interface ButtonSenhaProps {
  show: boolean;
  label: string;
  onToggle: () => void;
}

const ButtonSenha: React.FC<ButtonSenhaProps> = ({ show, onToggle, label }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <StyledButtonSenha
      aria-label={label}
      $darkMode={darkMode}
      onClick={onToggle}
      type="button"
    >
      {show ? <FaEyeSlash aria-label={label} /> : <FaEye aria-label={label} />}
    </StyledButtonSenha>
  );
};

export default ButtonSenha;
