import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  
  RouterProvider,
  
} from "react-router-dom";
import "./index.css";
import Router from './Router/Router.jsx';
import Authprovider from './Authprovider/Authprovider.jsx';
import { ToastContainer } from 'react-toastify';
import { Typewriter } from 'react-simple-typewriter';
import { HelmetProvider } from 'react-helmet-async';





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <HelmetProvider>
    <RouterProvider router={Router}>
    <Typewriter></Typewriter>

</RouterProvider>
<ToastContainer />
    </HelmetProvider>
    </Authprovider>
  </StrictMode>,
)
