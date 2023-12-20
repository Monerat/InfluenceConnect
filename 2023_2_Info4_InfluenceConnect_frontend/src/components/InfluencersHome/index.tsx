import React, { useContext } from 'react'

import { TelaHomeContent, CardsContainer, Card, CardImage, CardButton } from './styles.ts';

import Marcas from '../../assets/img/TelaAdminImg/marcas.png';
import Campanhas from '../../assets/img/TelaAdminImg/campanhas.png';

import { Link } from 'react-router-dom';

import { ThemeContext } from "../../context/themeContext";
import { FontSizeContext } from "../../context/fontSizeContext";

export const InfluencersHome: React.FC = () => {

    const { darkMode } = useContext(ThemeContext);
    const { paragrafoSize } = useContext(FontSizeContext);

    return (

        <>
            <TelaHomeContent>
                <CardsContainer>
                    <Card>
                        <Link to="/marcas">
                            <CardImage src={Marcas} alt="Entrar em marcas" />
                            <CardButton $darkmode={darkMode} $fontSizeLabel={`${paragrafoSize}rem`}>MARCAS</CardButton>
                        </Link>
                    </Card>
                    <Card>
                        <Link to="/campanhas">
                            <CardImage src={Campanhas} alt="Entrar em campanhas" />
                            <CardButton $darkmode={darkMode} $fontSizeLabel={`${paragrafoSize}rem`}>CAMPANHAS</CardButton>
                        </Link>
                    </Card>
                </CardsContainer>
            </TelaHomeContent>
        </>
    )
}