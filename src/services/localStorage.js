import { ACCESS_TOKEN, ACCESS_POST } from "../config/data";

const getToken = () => localStorage.getItem(ACCESS_TOKEN);
const setToken = (value) => localStorage.setItem(ACCESS_TOKEN, value);
const clearToken = () => localStorage.removeItem(ACCESS_TOKEN);

const getPost = () => localStorage.getItem(ACCESS_POST);
const setPost = (value) => localStorage.setItem(ACCESS_POST, value);
const clearPost = () => localStorage.removeItem(ACCESS_POST);

export { getToken, setToken, clearToken, getPost, setPost, clearPost };
