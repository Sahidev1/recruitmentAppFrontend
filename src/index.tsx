import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StartPortal from './views/startPortal';
import ApplicantLogin from './views/applicantLogin';
import RecruiterLogin from './views/recruiterLogin';
import { LoginProps, Props } from './interfaces/Props';
import { authenticateApplicant } from './apis/authAPI';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const login:LoginProps = {
  loginCallback:authenticateApplicant
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPortal/>,
  },
  {
    path: "/applicant_portal",
    element: <ApplicantLogin {...login}/>
  },
  {
    path: "/recruiter_portal",
    element: <RecruiterLogin {...login}/>
  }
]);

// Note that StrictMode causes double renders in Dev environment
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

