import axios from "axios";

/* The code is creating an instance of the Axios HTTP client called `axiosTCClient`. It is using the
`axios.create()` method to create the instance with a base URL and headers. */
export const axiosTCClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_TC_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    }
});

/**
 * The function sets the authorization header for requests made using the axiosTCClient with a given
 * token.
 * @param {string} token - The `token` parameter is a string that represents the authorization token
 * that will be used to authenticate requests to the server.
 */
export const setTCAuthorizationHeader = (token: string) => {
    axiosTCClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

/**
 * The function removes the 'Authorization' header from the common headers of the axiosTCClient.
 */
export const removeTCAuthorizationHeader = () => {
    delete axiosTCClient.defaults.headers.common['Authorization'];
}
