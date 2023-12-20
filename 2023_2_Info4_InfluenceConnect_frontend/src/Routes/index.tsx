import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";

import { Page404 } from "../pages/Page404";
import { Home } from "../pages/Home";
import { Influencers } from "../pages/Influencers";
import { Marcas } from "../pages/Marcas";
import { Campanhas } from "../pages/Campanhas";
import { DetalhesInfluencer } from "../pages/DetalhesInfluencer";
import { DetalhesMarcas } from "../pages/DetalhesMarcas";
import { DetalhesCampanha } from "../pages/DetalhesCampanhas";
import { CadastroInfluencer } from "../pages/CadastroInfluencers";
import { CadastroMarca } from "../pages/CadastroMarca";
import { CadastroCampanha } from "../pages/CadastroCampanhas";
import { Signin } from "../pages/Signin";
import { AdicionarInfluecerCampanha } from "../pages/AdicionarInfluencerCampanha";

const usuarioLogado = localStorage.getItem("Usuario-logado");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: "/",
        element: usuarioLogado ? <Navigate to={"/home"} /> : <Signin />,
      },

      {
        path: "/home",
        element: usuarioLogado ? <Home /> : <Navigate to={"/"} />,
      },

      {
        path: "/influencers",
        element: usuarioLogado ? <Influencers /> : <Navigate to={"/"} />,
      },

      {
        path: "/influencers/:id",
        element: usuarioLogado ? <DetalhesInfluencer /> : <Navigate to={"/"} />,
      },

      {
        path: "/marcas",
        element: usuarioLogado ? <Marcas /> : <Navigate to={"/"} />,
      },

      {
        path: "/marcas/:id",
        element: usuarioLogado ? <DetalhesMarcas /> : <Navigate to={"/"} />,
      },

      {
        path: "/campanhas",
        element: usuarioLogado ? <Campanhas /> : <Navigate to={"/"} />,
      },

      {
        path: "/campanhas/:id",
        element: usuarioLogado ? <DetalhesCampanha /> : <Navigate to={"/"} />,
      },

      {
        path: "/cadastro/influencers",
        element: <CadastroInfluencer />,
      },

      {
        path: "/cadastro/marcas",
        element: usuarioLogado ? <CadastroMarca /> : <Navigate to={"/"} />,
      },

      {
        path: "/cadastro/campanhas",
        element: usuarioLogado ? <CadastroCampanha /> : <Navigate to={"/"} />,
      },

      {
        path: "/finalizar-campanha",
        element: usuarioLogado ? (
          <AdicionarInfluecerCampanha />
        ) : (
          <Navigate to={"/"} />
        ),
      },
    ],
  },
]);
