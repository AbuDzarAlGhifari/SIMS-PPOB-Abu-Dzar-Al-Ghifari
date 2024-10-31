// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://take-home-test-api.nutech-integrasi.com';

// Function to register a user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/registration`, data);
    return response.data; // Return the response data
  } catch (error) {
    // Check if the error has a response and handle it
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Registration failed. Please try again.');
  }
};

// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Return the response data
  } catch (error) {
    // Check if the error has a response and handle it
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Login failed. Please try again.');
  }
};
