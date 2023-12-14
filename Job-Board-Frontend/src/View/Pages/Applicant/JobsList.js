import React, {useEffect, useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import './ApplicantHome.css';
import axios from "axios";

export const JobsList = () => {
    const applicant = localStorage.getItem("username")
    const [applicationsData, setApplicationsData] = useState({
        username: applicant,
        application_id: '',
        job_id: '',
        applicant_username: '',
        employer_username: '',
        status: '',
    });

    // const handleInputChange = (e) => {
    //
    // }; ??

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Jobs List');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'Profile'){ navigate("/applicant-home")}
        if (tab === 'Applications'){ navigate("/applicant-applications")}

    };

    const getSymbolForTab = (tab) => {
        switch (tab) {
            case 'Profile':
                return '👤';
            case 'Jobs List':
                return '💼';
            case 'Applications':
                return '📄';
            default:
                return '';
        }
    };

    useEffect(() => {
        // Function to fetch data from the backend
        const fetchData = async () => {
            try {
                debugger;
                const resp = await axios.get(
                    'http://localhost:8000/applicant/applications/',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            'username': applicant
                        }
                    }
                );

                if(resp.data.length !== 0){
                    // Append each field individually
                    Object.keys(applicationsData).forEach((key) => {
                        setApplicationsData((prevapplicationsData) => {
                            console.log(prevapplicationsData);
                            return { ...prevapplicationsData, [key]: resp.data[0][key] };
                        });
                    });
                }

            } catch (error) {
                console.log(error);
                if(error.response.status === 403 || error.response.status === 401){
                    navigate('/')
                }
                else{
                    alert('Oops! Something went wrong. Please try again later.');
                }
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    const handleSubmit = async e => {

    }

    return (
        <div>
            <h1>Welcome to the Applicant Applications Page</h1>
            <h1>Applications List</h1>
            <table>
                <thead>
                <tr>
                    <th>Application_ID</th>
                    <th>Job_ID</th>
                    <th>Employer</th>
                    <th>Status</th>
                    {/* Add more headers for other fields */}
                </tr>
                </thead>
                <tbody>
                {applicationsData.map(application => (
                    <tr key={application.id}>
                        <td>{application.id}</td>
                        <td>{application.job_id}</td>
                        <td>{application.employer_username}</td>
                        <td>{application.status}</td>
                        {/* Add more cells for other fields */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
    // return (
    //     <div>
    //         <h1>Welcome to the Applicant Applications Page</h1>
    //
    //     </div>
    //
    // );
};

export default JobsList;