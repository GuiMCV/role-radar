import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './components/App.jsx'
import 'primeicons/primeicons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { PrimeReactProvider } from '@primereact/core'
import Aura from '@primeuix/themes/aura'
import { PRIMEUI_LICENSE } from './utils/chaves.js'
import 'primeflex/primeflex.min.css'

const primereact = {
    theme:{
        preset: Aura
    },
    license: PRIMEUI_LICENSE
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider {...primereact}>
      <App />
    </PrimeReactProvider> 
  </StrictMode>,
)
