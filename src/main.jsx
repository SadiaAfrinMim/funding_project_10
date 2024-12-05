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





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <RouterProvider router={Router}>

</RouterProvider>
<ToastContainer />
    </Authprovider>
  </StrictMode>,
)
