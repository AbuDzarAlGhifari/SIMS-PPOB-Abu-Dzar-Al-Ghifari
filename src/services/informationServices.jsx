import axios from 'axios';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

export const getServicesApi = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.get(`${BASE_URL}/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const getBannersApi = async () => {
  const response = await axios.get(`${BASE_URL}/banner`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response;
};

export const getBalanceApi = async () => {
  const response = await axios.get(`${BASE_URL}/balance`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response;
};
