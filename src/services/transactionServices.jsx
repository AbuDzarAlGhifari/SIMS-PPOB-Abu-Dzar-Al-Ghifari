import axios from 'axios';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

export const topUpApi = async (top_up_amount) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }

  if (typeof top_up_amount !== 'number' || top_up_amount < 0) {
    throw new Error('Amount must be a number greater than or equal to 0');
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/topup`,
      { top_up_amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const TransactionApi = async (transactionData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/transaction`,
      transactionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getTransactionHistoryApi = async (offset = 0, limit = null) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const response = await axios.get(`${BASE_URL}/transaction/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        offset,
        ...(limit && { limit }),
      },
    });

    if (response.data.status !== 0) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
