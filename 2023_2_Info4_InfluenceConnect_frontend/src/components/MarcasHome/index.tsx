import React, { useContext } from 'react';
import { HomeContent, CardsContainer, Card, CardImage, CardButton } from './styles.ts';

import Influencer from '../../assets/img/TelaAdminImg/influencer.png';
import Campanhas from '../../assets/img/TelaAdminImg/campanhas.png';
import { ThemeContext } from '../../context/themeContext.tsx';
import { FontSizeContext } from '../../context/fontSizeContext.tsx';

import { Link } from 'react-router-dom';

export const MarcasHome: React.FC = () => {

    const { darkMode } = useContext(ThemeContext);
    const { paragrafoSize } = useContext(FontSizeContext);

    return (

        <HomeContent>
            <CardsContainer>
                <Card>
                    <Link to={'/influencers'}>
                        <CardImage src={Influencer} alt="Entrar em influenciador" />
                        <CardButton $darkMode={darkMode} $fontSizeLabel={`${paragrafoSize}rem`}>
                            INFLUENCIADOR
                        </CardButton>
                    </Link>
                </Card>

                <Card>
                    <Link to={'/campanhas'}>
                        <CardImage src={Campanhas} alt="Entrar em campanhas" />
                        <CardButton $darkMode={darkMode} $fontSizeLabel={`${paragrafoSize}rem`}>
                            CAMPANHAS
                        </CardButton>
                    </Link>
                </Card>
            </CardsContainer>
        </HomeContent>
    )
}