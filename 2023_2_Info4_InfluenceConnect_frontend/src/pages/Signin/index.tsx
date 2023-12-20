import React, { useContext, useEffect, useState } from "react";

import {
  StyledSignin,
  BackgroundImage,
  Rectangle,
  Logo,
  Title,
  InputContainer,
  Button,
  SenhaInputContainer,
  LinkCadastro,
} from "./styles";

import logo from "../../assets/img/logo.svg";

import { ThemeContext } from "../../context/themeContext";
import { FontSizeContext } from "../../context/fontSizeContext";
import { UsuarioContext } from "../../context/UsuarioContext";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLoginSchema } from "../../schemas";
import { CreateLoginData } from "../../interface";
import { api } from "../../api/api";
import { Modal } from "../../components/Modal";
import ButtonSenha from "../../components/ButtonSenha";

export const Signin: React.FC = () => {
  
  const [error, setError] = useState<boolean>(false);

  const { setUsuario } = useContext(UsuarioContext);
  const { darkMode } = useContext(ThemeContext);
  const { titleSize, paragrafoSize } = useContext(FontSizeContext);

  const [isReloadRequired, setIsReloadRequired] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (isReloadRequired) {
      window.location.reload();
      setIsReloadRequired(false);
    }
  }, [isReloadRequired]);

  const createLoginForm = useForm<CreateLoginData>({
    resolver: zodResolver(createLoginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = createLoginForm;

  const createLogin = async (data: CreateLoginData) => {
    api
      .post("pessoas/login", data)
      .then((response) => {
        setUsuario(response.data);
        localStorage.setItem("Usuario-logado", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);

        setIsReloadRequired(true);
      })
      .catch(() => {
        setError(true);

        setTimeout(() => {
          setError(false);
        }, 2000);
      });
  };

  return (
    <FormProvider {...createLoginForm}>
      <StyledSignin onSubmit={handleSubmit(createLogin)}>
        <BackgroundImage className="background"></BackgroundImage>
        <Rectangle $background={darkMode}>
          <Logo src={logo} alt="logo" />

          <Title $darkMode={darkMode} style={{ fontSize: `${titleSize}rem` }}>
            Faça seu Login
          </Title>

          <InputContainer
            className="Inputs"
            $darkMode={darkMode}
            $fontSizeSpan={`${paragrafoSize}rem`}
          >
            <div className="login-input">
              <label
                htmlFor="email"
                style={{ fontSize: `${paragrafoSize}rem` }}
              >
                E-mail
              </label>
              <div>
                <input
                  type="text"
                  id="email"
                  style={{ fontSize: `${paragrafoSize}rem` }}
                  {...register("email")}
                />
              </div>
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className="senha-input">
              <label
                htmlFor="senha"
                style={{ fontSize: `${paragrafoSize}rem` }}
              >
                Senha
              </label>

              <SenhaInputContainer>
                <input
                  type={showPassword ? "text" : "password"}
                  id="senha"
                  style={{ fontSize: `${paragrafoSize}rem` }}
                  {...register("senha")}
                />
                <ButtonSenha
                  label="Botao que troca a visibilidade do input senha"
                  show={showPassword}
                  onToggle={togglePasswordVisibility}
                />
              </SenhaInputContainer>
              {errors.senha && <span>{errors.senha.message}</span>}
            </div>
          </InputContainer>

          <div className="botao">
            <Button $darkMode={darkMode}>Entrar</Button>
          </div>
          <br />
          <LinkCadastro
            aria-label="Botão inscreva-se"
            $darkMode={darkMode}
            to="/cadastro/influencers"
            className="link-cadastro"
          >
            Inscreva-se
          </LinkCadastro>
        </Rectangle>

        {error && <Modal>E-mail ou senha inválidos</Modal>}
      </StyledSignin>
    </FormProvider>
  );
};
