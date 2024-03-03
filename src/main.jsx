import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './utils/authcontext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Router>
      <AuthProvider>
      <ToastContainer />
        <App />
      </AuthProvider>
    </Router>

  </>
);
