import {createContext, useContext, useEffect, useState} from 'react';
import {
    axiosClient,
    removeAuthorizationHeader,
    setAuthorizationHeader,
} from "../services/client";
import {axiosTCClient, removeTCAuthorizationHeader, setTCAuthorizationHeader} from "../services/tcClient";
import {router, useRootNavigation, useRouter, useSegments} from 'expo-router';
import {IFullUser} from "../types/FullUser";

/* The `AuthContextType` interface defines the shape of the authentication context object. It specifies
the properties and their types that will be available in the authentication context. */
interface AuthContextType {
    user: IFullUser;
    accessToken: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
/**
 * The `AuthProvider` function is a React component that provides authentication functionality,
 * including login and logout, to its child components.
 * @param  - - `children`: The child components that will be wrapped by the `AuthProvider` component.
 * @returns The `AuthProvider` component is returning the `AuthContext.Provider` component with the
 * `children` prop passed as its value.
 */
export function AuthProvider({children}: { children: React.ReactNode }) {
    const useProtectedRoute = (accessToken: string) => {
        const segments = useSegments();
        const router = useRouter();

        const [isNavigationReady, setNavigationReady] = useState(false);
        const rootNavigation = useRootNavigation();

        useEffect(() => {
            const unsubscribe = rootNavigation?.addListener("state", (event) => {
                setNavigationReady(true);
            });
            return function cleanup() {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }, [rootNavigation]);

        useEffect(() => {
            if (!isNavigationReady) {
                return;
            }
            const inAuthGroup = segments[0] === '(auth)';

            if (
                // If the user is not signed in and the initial segment is not anything in the auth group.
                !accessToken &&
                !inAuthGroup
            ) {
                // Redirect to the sign-in page.
                router.replace('/login');
            } else if (accessToken && inAuthGroup) {
                // Redirect away from the sign-in page.
                router.replace('/');
            }
        }, [accessToken, segments, isNavigationReady, router]);
    };

    const [user, setUser] = useState<IFullUser>({} as IFullUser);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    /**
     * The login function makes a POST request to authenticate the user with the provided email and
     * password, stores the access token in state, and retrieves the user information.
     * @param {string} email - A string representing the email address of the user trying to login.
     * @param {string} password - The `password` parameter is a string that represents the user's
     * password. It is used for authentication purposes when making a POST request to the API to log in
     * the user.
     */
    const login = async (email: string, password: string) => {
        try {
            // Make a POST request to your API to authenticate
            const response = await axiosClient.post('/employees/login', {email, password});

            // Store the access token in state
            setAccessToken(response.data.access_token);
            setAuthorizationHeader(response.data.access_token);
            setTCAuthorizationHeader(response.data.access_token);
            // setChatWSClientAuthorizationHeader(response.data.access_token);
            const response_user = await axiosClient.get('/employees/me');
            setUser(response_user.data);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    /**
     * The `logout` function clears the access token and removes authorization headers.
     */
    const logout = async () => {
        setAccessToken(null);
        removeAuthorizationHeader();
        removeTCAuthorizationHeader();
    };

    useProtectedRoute(accessToken || '');

    return (
        <AuthContext.Provider value={{user, accessToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to access the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};