import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { UIProvider } from "./context/UIContext";
import 'leaflet/dist/leaflet.css';


createRoot(document.getElementById('root')).render(
  <UIProvider>
    <App />
  </UIProvider>
)
