import {axiosClient} from "../services/client";
import {IUser} from "../types/User";
import {IFullUser} from "../types/FullUser";


/**
 * The function `getEmployees` is an asynchronous function that makes a GET request to retrieve a list
 * of employees and returns a Promise that resolves to an array of IUser objects.
 * @returns a Promise that resolves to an array of IUser objects.
 */
export async function getEmployees(): Promise<IUser[]> {
    const response = await axiosClient.get('/employees');
    return response.data;
}

/**
 * The function `getEmployee` retrieves an employee's information by their ID.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of an
 * employee.
 * @returns a Promise that resolves to an object of type IFullUser.
 */
export async function getEmployee(id: string): Promise<IFullUser> {
    const response = await axiosClient.get(`/employees/${id}`);
    return response.data;
}

/**
 * The function `getMe` makes an asynchronous request to retrieve information about the current user
 * and returns a promise that resolves to the full user object.
 * @returns a Promise that resolves to an object of type IFullUser.
 */
export async function getMe(): Promise<IFullUser> {
    const response = await axiosClient.get('/employees/me');
    return response.data;
}

/**
 * The function `getEmployeeImage` is an asynchronous function that retrieves the image of an employee
 * with a given ID using an HTTP GET request.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of an
 * employee.
 * @returns the image data of an employee with the specified ID.
 */
export async function getEmployeeImage(id: string): Promise<any> {
    const response = await axiosClient.get(`/employees/${id}/image`,
        {
            responseType: 'blob',
        }
    );
    return response.data.image;
}