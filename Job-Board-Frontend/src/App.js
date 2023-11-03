// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './View/Pages/Login';
import Signup from './View/Pages/Signup';
import JobApplicationForm from "./View/Pages/Applicant_JobApplication";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/jobApplication" element={<JobApplicationForm />} />
            </Routes>
        </Router>
    );
};

export default App;

