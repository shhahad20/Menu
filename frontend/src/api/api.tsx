// Create functions to make API calls to the backend using axios.
import axios from 'axios';

export const API_URL = 'http://localhost:5050'; 
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};