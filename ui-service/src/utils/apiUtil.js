import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: `/api`, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});


export default apiClient;
