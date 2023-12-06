import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ApplicantHome = () => {
  const [applicantData, setApplicantData] = useState([]);
  debugger;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/home/applicant/');
        setApplicantData(response.data);
      } catch (error) {
        console.error('Error fetching applicant data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Applicant Home Page</h1>
      <p>This is the page for applicants.</p>
      <h2>Applicant Data:</h2>
      <ul>
        {applicantData.map((applicant) => (
          <li key={applicant.id}>{applicant.name}</li>
        ))}
      </ul>
      {/* Add applicant-specific content here */}
    </div>
  );
};

export default ApplicantHome;