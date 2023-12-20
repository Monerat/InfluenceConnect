import { useContext, useState } from "react";

import { createInfluencerSchema } from "../../schemas";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Container } from "./styles";

import Background from "../../assets/imagens/image34.jpg";

import { Formulario } from "../../GlobalStyle";

import { ButtonPrincipal } from "../../components/ButtonPrincipal";
import { Title } from "../../components/Title";
import { DadosPessoais } from "../../components/DadosPessoais";
import { Imagens } from "../../components/Imagens";
import { RedesSocias } from "../../components/RedesSocias";
import { Nicho } from "../../components/DadosInfluencer";
import { Modal } from "../../components/Modal";

import { FontSizeContext } from "../../context/fontSizeContext";
import { ThemeContext } from "../../context/themeContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreateInfluencerData } from "../../interface";
import { api, headersRequest, postEntidade } from "../../api/api";

export const CadastroInfluencer = () => {
  const navigate = useNavigate();

  const { darkMode } = useContext(ThemeContext);
  const { paragrafoSize } = useContext(FontSizeContext);

  const { headersImg } = headersRequest();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<String>("")
  const [imagensExists, setImagensExist] = useState<boolean>(false)

  const createInfluencer = async (data: CreateInfluencerData) => {
    const {
      nome,
      nomeFantasia,
      email,
      cpf,
      cep,
      numero,
      senha,
      nicho,
      redesSociais,
      imagens,
      tipoEndereco,
    } = data;

    const response = await (
      await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    ).data;

    const { logradouro, complemento, bairro, localidade, uf } = response;

    const { nomeNicho, descricao, faixaEtaria, genero } = nicho;

    const influencer = {
      ativo: true,
      nomeFantasia: nomeFantasia,
      pessoa: {
        nome: nome,
        cpf: cpf,
        role: 2,
        email: email,
        senha: senha,
        enderecos: [
          {
            tipoLogradouro: "rua",
            tipoEndereco: tipoEndereco,
            numero: numero,
            cep: cep,
            logradouro: logradouro,
            complemento: complemento,
            bairro: bairro,
            cidade: localidade,
            estado: uf,
          },
        ],
      },
      nicho: {
        nome: nomeNicho,
        descricao: descricao,
        faixaEtaria: faixaEtaria,
        genero: genero,
      },
      redesSociais: redesSociais,
    };

    console.log(influencer);

    if (
      imagens.perfil === null ||
      imagens.feed1 === null ||
      imagens.feed2 === null ||
      imagens.feed3 === null ||
      imagens.background === null
    ) {
      setImagensExist(true)
    }

    api
      .post("influenciadores/public", influencer)
      .then((response) => {
        
        console.log(response);

        const id = response.data.id;

        if (imagensExists) {

          postEntidade(`influenciadores/imagem/${id}`, imagens, headersImg)
            .then(() => {

              setIsModalOpen(true);

              setTimeout(() => {
                navigate("/influencers");
              }, 2000);
            })
            .catch((err) => {
              console.log(err);
              setError(true);
              setErrorMessage(err.response.data.message);

              setTimeout(() => {
                setError(false);
              }, 2000);
            });
        } else {

          setIsModalOpen(true);

          setTimeout(() => {
            navigate("/influencers");
          }, 2000);
        }
      })
      .catch((err) => {
        if (influencer.pessoa.enderecos[0].logradouro == undefined) {
          console.log(err);
          setError(true);
          setErrorMessage("O CEP informado é inválido.");
        } else {
          console.log(err);
          setError(true);
          setErrorMessage(err.response.data.message);
        }

        setTimeout(() => {
          setError(false);
        }, 2000);
      });
  };

  const createInfluencerForm = useForm<CreateInfluencerData>({
    resolver: zodResolver(createInfluencerSchema),
  });

  const { handleSubmit } = createInfluencerForm;

  return (
    <FormProvider {...createInfluencerForm}>
      <Container>
        <Formulario
          onSubmit={handleSubmit(createInfluencer)}
          $fontSizeLabel={`${paragrafoSize}rem`}
          $darkMode={darkMode}
        >
          <Title>adicione um novo influencer</Title>

          <fieldset>
            <DadosPessoais />
          </fieldset>

          <fieldset>
            <Nicho />
          </fieldset>

          <fieldset>
            <RedesSocias />
          </fieldset>

          <fieldset>
            <Imagens />
          </fieldset>

          <div className="butoes">
            <ButtonPrincipal type="submit">salvar</ButtonPrincipal>
          </div>
        </Formulario>

        <div
          className="image"
          style={{
            background: `url(${Background}) no-repeat fixed`,
            backgroundSize: "cover",
          }}
        ></div>

        {isModalOpen && (
          <Modal>
            <h1 style={{ color: "green" }}>
              Influencer Cadastradrar com sucesso !
            </h1>
          </Modal>
        )}

  { error && <Modal>{errorMessage}</Modal> }
      </Container >
    </FormProvider >
  );
};
