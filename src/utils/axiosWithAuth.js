import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'https://tnt-stalk-market-be-production.herokuapp.com/api',
    headers: {
      authorization: token
    }
  });
};
export default axiosWithAuth;