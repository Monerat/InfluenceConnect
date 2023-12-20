import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unfonts from 'unplugin-fonts/vite'
import svgr from 'vite-plugin-svgr'


// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    react(), 
    svgr({ 
      svgrOptions: {
        
      },
    }),
    Unfonts({
      custom: {
        families: [{
          name: 'DMSans',
          local: 'DMSans',
          src: 'src/assets/fonts/DMSans*',

          transform(font) {
            if (font.basename === 'DMSans-Regular') {
              font.weight = 400
            }
            if (font.basename === 'DMSans-Italic') {
              font.weight = 400
            }
            if (font.basename === 'DMSans-SemiBold') {
              font.weight = 600
            }
            if (font.basename === 'DMSans-Black') {
              font.weight = 900
            }
            return font
          }
          
        }],
        display: 'swap',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend',
      },
    
    }),
  ],
  server: {
    port: 3010
  }
})
