import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});


export default apiClient;
