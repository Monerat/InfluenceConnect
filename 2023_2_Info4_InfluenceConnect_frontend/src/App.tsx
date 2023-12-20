import { Outlet } from 'react-router-dom'
import { Header } from './components/Header/index.tsx'
import { useContext, useEffect } from 'react'
import { UsuarioContext } from './context/UsuarioContext.tsx'
import './GlobalStyle.ts'

function App() {

  const { setToken, setUsuario } = useContext(UsuarioContext)

  useEffect(() => {

    const usuarioStorage = localStorage.getItem('Usuario-logado')
    const token = localStorage.getItem('token')

    if (token) {

      const tokenString = String(localStorage.getItem('token'))

      setToken(tokenString)
    }

    if (usuarioStorage) {
      setUsuario(JSON.parse(usuarioStorage))
    }

  }, [])

  return (

    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
