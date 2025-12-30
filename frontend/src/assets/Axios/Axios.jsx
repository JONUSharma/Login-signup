import axios from "axios";

const Axios = axios.create({
    //   baseURL: import.meta.env.VITE_BACKEND_URL,
    baseURL: "http://localhost:2020",
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true, 
});

/*  Attach JWT token automatically */
Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


export default Axios;
