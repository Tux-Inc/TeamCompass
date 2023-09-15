import axios from "axios";

/* The code `export const axiosOWMClient = axios.create({ baseURL: process.env.EXPO_PUBLIC_OWM_API_URL
});` is creating an instance of the Axios HTTP client with a specific base URL. */
export const axiosOWMClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_OWM_API_URL,
});
