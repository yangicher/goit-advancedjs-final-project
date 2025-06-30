import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://your-energy.b.goit.study/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function showErrorToast(message) {
  iziToast.show({
    title: 'Error:',
    message: message || 'Something went wrong',
    color: 'red',
    position: 'topRight',
  });
}

async function request(method, path, params) {
  try {
    const url = `${BASE_URL}${path}`;
    const config = ['get', 'delete'].includes(method) ? { params } : params;

    const response = await axios[method](url, config);
    return response.data;
  } catch (error) {
    showErrorToast(error?.response?.data?.message || error.message);
    throw error;
  }
}

export const get = (path, params) => request('get', path, params);
export const post = (path, params) => request('post', path, params);
export const patch = (path, params) => request('patch', path, params);
