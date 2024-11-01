import axios from 'axios';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

export const registerUserApi = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/registration`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const loginUserApi = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
