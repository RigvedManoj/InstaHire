import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./View/Pages/Login";
import {Logout} from './View/Pages/logout';
import {Signup} from './View/Pages/Signup';
import {JobApplicationForm} from "./View/Pages/Applicant/Applicant_JobApplication";
import {JobCreation} from "./View/Pages/Employer/JobCreation";
import {EmployerHome} from './View/Pages/Employer/EmployerHome';
import {ApplicantHome} from './View/Pages/Applicant/ApplicantHome';
import {ApplicantApplications} from './View/Pages/Applicant/ApplicantApplications';
import EmployerApplications from "./View/Pages/Employer/EmployerApplications";


// App.js
const App = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/employer-home" element={<EmployerHome/>}/>
          <Route path="/applicant-home" element={<ApplicantHome/>}/>
          <Route path="/job-application" element={<JobApplicationForm/>}/>
          <Route path="/job-creation" element={<JobCreation/>}/>
          <Route path="/applicant-applications" element={<ApplicantApplications/>}/>
          <Route path="/employer-applications" element={<EmployerApplications/>}/>
        </Routes>
      </BrowserRouter>
    );
};

export default App;
