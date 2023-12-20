import { useContext, useEffect, useState } from 'react';

import Logo from '../../assets/img/Logo/Logo.svg';

import { HeaderContent } from './styles';

import { ThemeContext } from '../../context/themeContext';
import { FontSizeContext } from '../../context/fontSizeContext';
import { UsuarioContext } from '../../context/UsuarioContext';

import { Link } from 'react-router-dom';

import { MoreHorizontal, X } from 'lucide-react'
import { MenuHamburger } from '../MenuHamburger';
import { Loading } from '../Loading';
import { SwitchLightDarkMode } from '../SwitchLightDarkMode';
import { ButtonHeader } from '../ButtonHeader';
import { Perfil } from '../Perfil';

import { useNavigate } from 'react-router-dom';

export const Header = () => {

  const { usuario: { pessoa: { nome } } } = useContext(UsuarioContext)

  const {

    titleSize,
    setTitleSize,
    paragrafoSize,
    setParagrafoSize

  } = useContext(FontSizeContext)

  const { darkMode, isDarkMode } = useContext(ThemeContext)

  const [isReloadRequired, setIsReloadRequired] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isPerfilOpen, setIsPerfilOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {

    if (isReloadRequired) {

      window.location.reload();
      setIsReloadRequired(false);
    }

  }, [isReloadRequired]);

  const handleLogout = () => {

    localStorage.removeItem("Usuario-logado")
    setIsLoading(true)

    setTimeout(() => {

      setIsLoading(false)
    }, 3000);

    setIsReloadRequired(true)
  }

  const handleAutoContraste = () => {

    isDarkMode(!darkMode)
    darkMode ? localStorage.setItem('theme', 'dark') : localStorage.removeItem('theme')
  }

  const handleDiminuirFonte = () => {

    titleSize > 1 && setTitleSize(titleSize - 0.5)
    paragrafoSize > 1 && setParagrafoSize(paragrafoSize - 0.5)
  }

  const handleAumentarFonte = () => {

    setTitleSize(titleSize + 0.5)
    setParagrafoSize(paragrafoSize + 0.5)
  }

  return (

    <>
      {isLoading && <Loading />}
      <HeaderContent
        $darkMode={darkMode}
        $fontSize={`${paragrafoSize}rem`}
      >
        <div className='header-container'>

          <Link to={'/home'}>
            <img className='logo'
              src={Logo} alt='logo da influence connect'
            />
          </Link>

          <div className='saudacoes'>

            {
              nome &&
              <button onClick={() => setIsPerfilOpen(!isPerfilOpen)}>
                Olá, {nome}
              </button>
            }

            <div className='menuHamburger'>

              {
                !isMenuOpen
                  ? <MoreHorizontal
                    size={titleSize * 12}
                    color='#E94C50'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  />
                  : <X
                    size={titleSize * 12}
                    color='#E94C50'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  />
              }
            </div>

            {
              isMenuOpen &&
              <MenuHamburger
                handleDiminuirFonte={handleDiminuirFonte}
                handleAumentarFonte={handleAumentarFonte}
                handleAutoContraste={handleAutoContraste}
              />
            }

            {
              isPerfilOpen &&
              <Perfil
                handleFinalizarCampanha={() => navigate('/finalizar-campanha')}
                handleLogout={handleLogout}
              />
            }

            <div className='botoes'>

              <ButtonHeader label={'Diminuir tamanho da fonte -A'} onToggle={handleDiminuirFonte}>-A</ButtonHeader>
              <ButtonHeader label={'Aumentar tamanho da fonte +A'} onToggle={handleAumentarFonte}>+A</ButtonHeader>
              <button
                title='Ativar e desativar o auto-contraste'
                aria-label='Ativar e desativar o auto-contraste'
                onClick={handleAutoContraste}></button>
              <SwitchLightDarkMode
                label={'Ativar alto contraste'}
                onToggle={handleAutoContraste}
              />
            </div>
          </div>
        </div>

      </HeaderContent >
    </>
  )
}
