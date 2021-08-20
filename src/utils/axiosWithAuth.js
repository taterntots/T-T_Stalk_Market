import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: process.env.REACT_APP_DATABASE_URL,
    headers: {
      authorization: token
    }
  });
};
export default axiosWithAuth;