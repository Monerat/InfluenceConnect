import { useContext } from "react";
import { AdministradorInfluencers } from "../../components/AdministradorInfluencers";
import { MarcasInfluencers } from "../../components/MarcasInfluencers";
import { UsuarioContext } from "../../context/UsuarioContext";

export const Influencers = () => {
  const {
    usuario: {
      pessoa: { role },
    },
  } = useContext(UsuarioContext);

  const roles: string[] = ["INFLUENCIADOR", "MARCA", "ADMIN"];

  if (role === roles[1]) {

    return <MarcasInfluencers />

  } else if (role === roles[2]) {

    return <AdministradorInfluencers />
  }
};
