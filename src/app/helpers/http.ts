import axios from 'axios';

type Headers = {
  [key: string]: string;
};

const http = (token?: string) => {
  const headers: Headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return axios.create({
    headers,
    baseURL: 'http://localhost:3001',
  });
};

export default http;
