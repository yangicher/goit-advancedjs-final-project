import axios from 'axios';
const BASE_URL = 'https://your-energy.b.goit.study/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const get = async (path, params) => {
  try {
    const response = await axios.get(`${BASE_URL}${path}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error in get:', error);
    throw error;
  }
};

export const patch = async (path, params) => {
  try {
    const response = await axios.patch(`${BASE_URL}${path}`, params);
    return response.data;
  } catch (error) {
    console.error('Error in patch:', error);
    throw error;
  }
};

export const post = async (path, params) => {
    try {
        const res = await axios.post(`${BASE_URL}${path}`, params);
        return res.data;
    } catch (error) {
        console.error('Error in post:', error);
        return error.response;
    }
};