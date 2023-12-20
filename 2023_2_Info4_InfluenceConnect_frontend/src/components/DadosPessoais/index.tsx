import React, { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import ButtonSenha from "../ButtonSenha";
import { SenhaInputContainer } from "./styles";

export const DadosPessoais: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const handleCpfChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cpf = event.target.value.replace(/\D/g, "");

    const formattedCpf = cpf.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );

    setValue("cpf", formattedCpf);
  };

  const userPassword = watch("senha");
  const isPasswordStrong = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  ).test(userPassword);

  const userCpf = watch("cpf");
  const cpfinValid = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(userCpf);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <>
      <legend>Dados Pessoais</legend>

      <div className="campo">
        <label htmlFor="nome" aria-label="campo para preencher nome do usuário">
          Nome
        </label>

        <input
          maxLength={40}
          type="text"
          id="nome"
          {...register("nome", { required: true, maxLength: 12 })}
        />

        {errors.nome && <span>O nome é obrigatório</span>}
      </div>

      <div className="campo">
        <label
          htmlFor="nomeFantasia"
          aria-label="campo para preencher arroba do usuário"
        >
          Nome Fantasia
        </label>

        <input type="text" id="nomeFantasia" {...register("nomeFantasia")} />

        {errors.nomeFantasia && <span>O nome Fantasia é obrigatório</span>}
      </div>

      <div className="campo">
        <label
          htmlFor="email"
          aria-label="campo para preencher email do usuário"
        >
          E-mail
        </label>

        <input maxLength={40} type="email" id="email" {...register("email")} />

        {errors.email && <span>O e-mail é obrigatório</span>}
      </div>

      <div className="campo">
        <label htmlFor="cpf" aria-label="campo para preencher c.p.f do usuário">
          CPF
        </label>

        <input
          maxLength={14}
          type="text"
          id="cpf"
          {...register("cpf")}
          onChange={handleCpfChange}
        />

        {cpfinValid ? (
          <span className="spanSenha" style={{ color: "green" }}>
            CPF válido
          </span>
        ) : (
          <span className="spanSenha" style={{ color: "red" }}>
            CPF inválido
          </span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="cep" aria-label="campo para cep do usuário">
          Cep
        </label>

        <input type="text" id="cep" {...register("cep")} />

        {errors.cep && <span>O cep é obrigatório</span>}
      </div>

      <div className="campo">
        <label htmlFor="numero" aria-label="campo para cep do usuário">
          Número
        </label>

        <input type="text" id="numero" {...register("numero")} />

        {errors.cep && <span>O cep é obrigatório</span>}
      </div>

      <div className="campo">
        <label
          htmlFor="tipoEndereco"
          aria-label="campo para tipo de endereço do usuário"
        >
          Tipo endereço
        </label>

        <select id="tipoEndereco" {...register("tipoEndereco")}>
          <option value="COMERCIAL">CORMECIAL</option>

          <option value="ENTREGA">ENTREGA</option>
        </select>
      </div>

      <div className="campo">
        <label
          htmlFor="senha"
          aria-label="campo para preencher senha do usuário"
        >
          Senha
        </label>

        {isPasswordStrong ? (
          <span className="spanSenha" style={{ color: "green" }}>
            Senha forte
          </span>
        ) : (
          <span className="spanSenha" style={{ color: "red" }}>
            Senha fraca
          </span>
        )}

        <SenhaInputContainer>
          <input
            maxLength={40}
            type={showPassword ? "text" : "password"}
            id="senha"
            {...register("senha")}
          />
          <ButtonSenha
            label="botão confirmar senha"
            show={showPassword}
            onToggle={togglePasswordVisibility}
          />
        </SenhaInputContainer>
        {errors.senha && <span>A senha é obrigatória</span>}
      </div>

      <div className="campo">
        <label
          htmlFor="confirmarSenha"
          aria-label="campo para preencher senha do usuário"
        >
          Confirmar senha
        </label>

        <SenhaInputContainer>
          <input
            maxLength={40}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmarSenha"
            {...register("confirmarSenha")}
          />
          <ButtonSenha
            label="botão confirmar senha"
            show={showConfirmPassword}
            onToggle={toggleConfirmPasswordVisibility}
          />
        </SenhaInputContainer>
        {errors.confirmarSenha && <span>As senhas devem ser iguais</span>}
      </div>
    </>
  );
};

export const AtualizarDadosPessoais: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const handleCpfChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cpf = event.target.value.replace(/\D/g, "");

    const formattedCpf = cpf.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );

    setValue("cpf", formattedCpf);
  };

  const handleCepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/\D/g, "");

    const formattedCep = cep.replace(
      /(\d{5})(\d{3})/,
      "$1-$2"
    );

    setValue("cep", formattedCep);
  };

  const userPassword = watch("senha");
  const isPasswordStrong = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  ).test(userPassword);

  const userCpf = watch("cpf");
  const cpfinValid = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(userCpf);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <>
      <legend>Dados Pessoais</legend>

      <div className="campo">
        <label htmlFor="nome" aria-label="campo para preencher nome do usuário">
          Nome
        </label>

        <input
          maxLength={40}
          type="text"
          id="nome"
          {...register("nome")}
        />

      </div>

      <div className="campo">
        <label
          htmlFor="nomeFantasia"
          aria-label="campo para preencher arroba do usuário"
        >
          Nome Fantasia
        </label>

        <input type="text" id="nomeFantasia" {...register("nomeFantasia")} />

      </div>

      <div className="campo">
        <label
          htmlFor="email"
          aria-label="campo para preencher email do usuário"
        >
          E-mail
        </label>

        <input maxLength={40} type="email" id="email" {...register("email")} />

      </div>

      <div className="campo">
        <label htmlFor="cpf" aria-label="campo para preencher c.p.f do usuário">
          CPF
        </label>

        <input
          maxLength={14}
          type="text"
          id="cpf"
          {...register("cpf")}
          onChange={handleCpfChange}
        />

        {cpfinValid ? (
          <span className="spanSenha" style={{ color: "green" }}>
            CPF válido
          </span>
        ) : (
          <span className="spanSenha" style={{ color: "red" }}>
            CPF inválido
          </span>
        )}
      </div>

      <div className="campo">
        <label htmlFor="cep" aria-label="campo para cep do usuário">
          Cep
        </label>

        <input 
          maxLength={8}
          type="text" 
          id="cep"
          {...register("cep")} 
          onChange={handleCepChange}
        />

      </div>

      <div className="campo">
        <label htmlFor="numero" aria-label="campo para cep do usuário">
          Número
        </label>

        <input
          type="text" id="numero" {...register("numero")} />

      </div>

      <div className="campo">
        <label
          htmlFor="tipoEndereco"
          aria-label="campo para tipo de endereço do usuário"
        >
          Tipo endereço
        </label>

        <select id="tipoEndereco" {...register("tipoEndereco")}>
          <option value="COMERCIAL">CORMECIAL</option>

          <option value="ENTREGA">ENTREGA</option>
        </select>
      </div>

      <div className="campo">
        <label
          htmlFor="senha"
          aria-label="campo para preencher senha do usuário"
        >
          Senha
        </label>

        {isPasswordStrong ? (
          <span className="spanSenha" style={{ color: "green" }}>
            Senha forte
          </span>
        ) : (
          <span className="spanSenha" style={{ color: "red" }}>
            Senha fraca
          </span>
        )}

        <SenhaInputContainer>
          <input
            maxLength={40}
            type={showPassword ? "text" : "password"}
            id="senha"
            {...register("senha")}
          />
          <ButtonSenha
            label="botão confirmar senha"
            show={showPassword}
            onToggle={togglePasswordVisibility}
          />
        </SenhaInputContainer>
      </div>

      <div className="campo">
        <label
          htmlFor="confirmarSenha"
          aria-label="campo para preencher senha do usuário"
        >
          Confirmar senha
        </label>

        <SenhaInputContainer>
          <input
            maxLength={40}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmarSenha"
            {...register("confirmarSenha")}
          />
          <ButtonSenha
            label="botão confirmar senha"
            show={showConfirmPassword}
            onToggle={toggleConfirmPasswordVisibility}
          />
        </SenhaInputContainer>
        {errors.confirmarSenha && <span>As senhas devem ser iguais</span>}
      </div>
    </>
  );
};