import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from './Routes/index.tsx';
import { GlobalStyle } from './GlobalStyle.ts';

import { ThemeProvider } from './context/themeContext.tsx';
import { FontSizeProvider } from './context/fontSizeContext.tsx';
import { UsuarioProvider } from './context/UsuarioContext.tsx';
import { CarrinhoInfluencersProvider } from './context/carrinhoInfluencers.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <CarrinhoInfluencersProvider>
    <UsuarioProvider>
      <ThemeProvider>
        <FontSizeProvider>
          <GlobalStyle />
          <RouterProvider router={router} />
        </FontSizeProvider>
      </ThemeProvider>
    </UsuarioProvider>
  </CarrinhoInfluencersProvider>
)
