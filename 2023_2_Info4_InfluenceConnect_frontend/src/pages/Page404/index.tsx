import { useContext } from 'react'

import { Page404Style } from './styles';

import Background from '../../assets/img/BackgroundImage/backgroundImage.svg';
import ImageErro from '../../assets/imagens/404Image.webp'

import { ThemeContext } from '../../context/themeContext';

import { Title } from '../../components/Title';
import { Header } from '../../components/Header';

export const Page404 = () => {

    const { darkMode } = useContext(ThemeContext)

    return (

        <>
            <Header />
            <Page404Style
                $DarkMode={darkMode}
                style={{
                    background: `url(${Background}) fixed`,
                    backgroundSize: 'cover'
                }}>

                <div className='border'>
                    <div className="container">
                        <img src={ImageErro} alt="imagem de erro" />
                        <Title>
                            Erro ao Encontrar Página
                        </Title>
                    </div>
                </div>
            </Page404Style>
        </>

    )
}
