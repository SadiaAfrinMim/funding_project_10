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

const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout></Mainlayout>,
      children:[
        { path: "/",
          element:<Home></Home>,
          children:[
          
            
            
            {
              path: "/",
              element: <RunningFund />,
              loader: () =>
                fetch(`http://localhost:5000/campaigns`).then((res) => res.json()),
              
            }
            
        ]

        },
        {
          path: "/campaigns",
          element:<AddCampaign></AddCampaign>,
        },
        {
          path: "/my-campaigns",
          element:<Mycampaign></Mycampaign>,
          loader:()=>fetch('http://localhost:5000/campaigns')
        },
        {
          path: '/campaigns/:id',
          element: <CampaignDetails />,
          loader: ({ params }) => fetch(`http://localhost:5000/campaigns/${params.id}`)

          
        },
        {
          path: "/add-campaign",
          element: <Allcampaigns />,
          loader: () =>
            fetch(`http://localhost:5000/campaigns`).then((res) => res.json()),
          
        },
        {
          path: "/my-donations",
          element:<Mycampaings></Mycampaings>
        },
        {
          path:"/donation/:id",
          element:<Update></Update>,
          loader:({params})=>fetch(`http://localhost:5000/donation/${params.id}`)
        },
        
          {
        path: "/register",
        element:<Registration ></Registration>
        
      },
      {
        path: "/login",
        element:<Login></Login>
    },
    
    ]
    },
   
   

  ]);

export default router;