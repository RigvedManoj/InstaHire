import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const EmployerHome = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/home/employer');
        setMessage(response.data.message); // Set the message from the backend
      } catch (error) {
        console.error('Error fetching employer data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Employer Home Page</h1>
      <p>This is the page for employers.</p>
      <h2>Employer Data:</h2>
      {message && <p>{message}</p>} {/* Display the message from the backend */}
    </div>
  );
};

export default EmployerHome;