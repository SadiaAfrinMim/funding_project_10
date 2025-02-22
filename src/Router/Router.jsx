import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Navbar from '../Component/Navbar/Navbar';
import Login from '../Pages/Login';
import Registration from '../Pages/Registration';
import Mainlayout from '../Mainlayout/Mainlayout';
import Home from '../Pages/Home';
import AddCampaign from '../Pages/AddCampaign';
import RunningFund from '../Component/Runningfund/Runningfund';
// import { App } from '../App';
// import Ourmission from '../Component/Ourmission/Ourmission'
import Allcampaigns from '../Pages/Allcampaings';
import CampaignDetails from '../Pages/CampaignDetails';
import Mycampaign from '../Pages/Mycampaign';
import Mycampaings from '../Pages/Mycampaings';
import Update from '../Pages/Update';
import Privateroute from './privateRoute';
import Reset from '../Component/Reset';
import Error from '../Pages/Error';
import Lottie from '../Component/Lottie';
import AboutUs from '../Pages/AboutUs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,

        children: [



          {
            path: "/",
            element: <RunningFund />,
            loader: () =>
              fetch(`https://user-server-side-management-system.vercel.app/campaigns`).then((res) => res.json()),

          }

        ]

      },
      {
        path: "/add-campaign",
        element: <Privateroute><AddCampaign></AddCampaign></Privateroute>,
      },
      {
        path: "/my-campaigns",
        element: <Privateroute><Mycampaign></Mycampaign></Privateroute>,
        loader: () => fetch('https://user-server-side-management-system.vercel.app/campaigns')
      },
      {
        path: '/campaigns/:id',
        element: <Privateroute><CampaignDetails></CampaignDetails></Privateroute>,
        loader: ({ params }) => fetch(`https://user-server-side-management-system.vercel.app/campaigns/${params.id}`)


      },
      {
        path: "/campaigns",
        element: <Allcampaigns />,
        loader: () =>
          fetch(`https://user-server-side-management-system.vercel.app/campaigns`).then((res) => res.json()),

      },
      {
        path: "/my-donations",
        element: <Privateroute><Mycampaings></Mycampaings></Privateroute>
      },
      {
        path: "/donation/:id",
        element: <Update></Update>,
        loader: ({ params }) => fetch(`https://user-server-side-management-system.vercel.app/donation/${params.id}`)
      },

      {
        path: "/register",
        element: <Registration ></Registration>

      },
      {
        path:'/about',
        element:<AboutUs></AboutUs>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/reset",
        element: <Reset></Reset>
      },
      {
        path: '/lo',
        element: <Lottie></Lottie>
      }

    ]
  },



]);

export default router;