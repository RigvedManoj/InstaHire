import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ApplicantHome = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/home/applicant');
        setMessage(response.data.message); // Set the message from the backend
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
      {message && <p>{message}</p>} {/* Display the message from the backend */}
    </div>
  );
};

export default ApplicantHome;
