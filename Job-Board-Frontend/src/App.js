import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./View/Pages/Login";
import {Logout} from './View/Pages/logout';
import {Signup} from './View/Pages/Signup';
import {EmployerHome} from './View/Pages/Employer/EmployerHome';
import {ApplicantHome} from './View/Pages/Applicant/ApplicantHome';
import {ApplicantApplications} from './View/Pages/Applicant/ApplicantApplications';

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
          <Route path="/applicant-applications" element={<ApplicantApplications/>}/>
        </Routes>
      </BrowserRouter>
    );
};

export default App;
