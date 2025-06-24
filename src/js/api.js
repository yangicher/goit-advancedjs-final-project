import axios from 'axios';
const BASE_URL = 'https://your-energy.b.goit.study/api/';

export const get = async (path, params) => {
  try {
    const response = await axios.get(`${BASE_URL}${path}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patch = async (path, params) => {
  try {
    const response = await axios.patch(`${BASE_URL}${path}`, params);
    return response;
  } catch (error) {
    throw error;
  }
};