import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Routes/Routes.jsx';
import AuthProviders from './Providers/AuthProviders.jsx';
import { HelmetProvider } from 'react-helmet-async';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
    <HelmetProvider>
      <RouterProvider router={router} />
      </HelmetProvider>
    </AuthProviders>
  </React.StrictMode>,
)
