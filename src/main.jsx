import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from './components/GlobalStyles';
import { AuthProvider } from '~/context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalStyle>   
        <App />
      </GlobalStyle>
    </AuthProvider>
  </React.StrictMode>,
)
