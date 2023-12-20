import { useContext } from 'react';
import {

    CardsContainer,
    Card, CardImage,
    CardButton,
    Container
} from './styles.ts';

import Marcas from '../../assets/img/TelaAdminImg/marcas.png';
import Influencer from '../../assets/img/TelaAdminImg/influencer.png';
import Campanhas from '../../assets/img/TelaAdminImg/campanhas.png';
import { ThemeContext } from "../../context/themeContext";
import { FontSizeContext } from "../../context/fontSizeContext";

import { Link } from 'react-router-dom';

export const AdministradorHome = () => {

    const { darkMode } = useContext(ThemeContext);
    const { paragrafoSize } = useContext(FontSizeContext)

    return (

        <Container>
            <CardsContainer>

                <Card>
                    <Link to={'/influencers'}>
                        <CardImage src={Influencer} alt="Entrar em influenciador" />
                        <CardButton
                            $darkmode={darkMode}
                            $fontSizeLabel={`${paragrafoSize}rem`}
                        >
                            INFLUENCIADOR
                        </CardButton>
                    </Link>
                </Card>

                <Card>
                    <Link to={'/marcas'}>
                        <CardImage src={Marcas} alt="Entrar em marcas" />
                        <CardButton
                            $darkmode={darkMode}
                            $fontSizeLabel={`${paragrafoSize}rem`}
                        >
                            MARCAS
                        </CardButton>
                    </Link>
                </Card>

                <Card>
                    <Link to={'/campanhas'}>
                        <CardImage src={Campanhas} alt="Entrar em campanhas" />
                        <CardButton
                            $darkmode={darkMode}
                            $fontSizeLabel={`${paragrafoSize}rem`}
                        >
                            CAMPANHAS
                        </CardButton>
                    </Link>
                </Card>
            </CardsContainer>
        </Container>
    )
}