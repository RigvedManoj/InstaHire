import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./View/Pages/Login";
import {Logout} from './View/Pages/logout';
import {Signup} from './View/Pages/Signup';
import {EmployerHome} from './View/Pages/EmployerHome';
import {ApplicantHome} from './View/Pages/ApplicantHome';
import JobApplicationForm from "./View/Pages/Applicant_JobApplication";
import JobCreation from "./View/Pages/JobCreation";

// App.js
const App = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/employer-home" element={<EmployerHome/>}/>
          <Route path="/applicant-home" element={<ApplicantHome/>}/>
          <Route path="/job-application" element={<JobApplicationForm/>}/>
          <Route path="/job-creation" element={<JobCreation/>}/>
        </Routes>
      </BrowserRouter>
    );
};

export default App;
