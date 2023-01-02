import axios from 'axios';

// axios.defaults.withCredentials = true;
const publicAPI = "https://web-production-9d5a.up.railway.app/api/";
const localApi = "http://localhost:5000/api/";
export const apiUrl = publicAPI;

export const POST = async (url, post, token = "") => {
  const res = await axios.post(apiUrl + url, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const GET = async (url, token = "") => {
  const res = await axios.get(apiUrl + url, {
    headers: { Authorization: token },
  });
  return res;
};

export const PUT = async (url, post, token = "") => {
  const res = await axios.put(apiUrl + url, post, {
    headers: { Authorization: token },
  });
  return res;
};
export const PATCH = async (url, post, token = "") => {
  const res = await axios.patch(apiUrl + url, post, {
    headers: { Authorization: token },
  });
  return res;
};
export const DELETE = async (url, token = "") => {
  const res = await axios.delete(apiUrl + url, {
    headers: { Authorization: token },
  });
  return res;
};
