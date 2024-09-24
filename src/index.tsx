import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StartPortal from './views/startPortal';
import ApplicantLogin from './views/applicantLogin';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPortal/>,
  },
  {
    path: "/applicant_portal",
    element: <ApplicantLogin/>
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

