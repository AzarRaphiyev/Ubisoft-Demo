import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import DataContext from './context/DataContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DataContext>
    <App />
  </DataContext>
  </BrowserRouter>,
)
