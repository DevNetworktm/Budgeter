import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:2000";
Axios.interceptors.response.use((res) => res.data);