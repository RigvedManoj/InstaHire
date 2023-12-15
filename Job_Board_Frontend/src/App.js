import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./View/Pages/Login";
import {Logout} from './View/Pages/logout';
import {Signup} from './View/Pages/Signup';
import {JobCreation} from "./View/Pages/Employer/JobCreation";
import {EmployerHome} from './View/Pages/Employer/EmployerHome';
import {ApplicantHome} from './View/Pages/Applicant/ApplicantHome';
import {ApplicantApplications} from './View/Pages/Applicant/ApplicantApplications';
import {EmployerApplications} from "./View/Pages/Employer/EmployerApplications";
import {JobsList} from './View/Pages/Applicant/JobsList';
import {ViewApplicant} from "./View/Pages/Employer/ViewApplicant";


// App.js contains the routes for all react classes. Default route goes to Login Page.
const App = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/employer-home" element={<EmployerHome/>}/>
          <Route path="/applicant-home" element={<ApplicantHome/>}/>
          <Route path="/job-creation" element={<JobCreation/>}/>
          <Route path="/applicant-applications" element={<ApplicantApplications/>}/>
          <Route path="/employer-applications" element={<EmployerApplications/>}/>
          <Route path="/applicant-jobs-list" element={<JobsList/>}/>
          <Route path="/view_applicant" element={<ViewApplicant/>}/>
        </Routes>
      </BrowserRouter>
    );
};

export default App;
