import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import './index.css';
import ImageSlider from "./components/ImageSlider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
      {/*<Dashboard/>*/}
  </StrictMode>,
)
