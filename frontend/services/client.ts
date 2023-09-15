import axios from "axios";

/* The code is creating an instance of the Axios HTTP client called `axiosClient`. It is using the
`axios.create()` method to create the client with a specified configuration. */
export const axiosClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Group-Authorization': process.env.EXPO_PUBLIC_API_TOKEN,
    }
});

/**
 * The function sets the authorization header for axiosClient with the provided token.
 * @param {string} token - The `token` parameter is a string that represents an authentication token.
 * It is used to set the value of the `Authorization` header in the HTTP request.
 */
export const setAuthorizationHeader = (token: string) => {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

/**
 * The function removes the 'Authorization' header from the default headers of an axios client.
 */
export const removeAuthorizationHeader = () => {
    delete axiosClient.defaults.headers.common['Authorization'];
}
