import { Item } from "../models/item";
import { User } from "../models/user";
import axios from 'axios';
import { ConflictError, UnauthorizedError } from "../errors/http_errors";

// Heroku base url
const BASE_URL = 'https://create-your-todolist-75c62e8accfe.herokuapp.com'; 
// production url
// const BASE_URL =  'http://localhost:5005';



async function fetchData<T>(url: string): Promise<T> {
    
    try {
        const response = await axios.get<T>(url, {withCredentials: true });
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            const errorBody = error.response.data;
            const errorMessage = errorBody.error || "An error occurred";
            if (error.response.status === 401) {
                throw new UnauthorizedError(errorMessage);
            } else if (error.response.status === 409) {
                throw new ConflictError(errorMessage);
            } else {
                throw new Error(`Request failed with status: ${error.response.status} message: ${errorMessage}`);
            }
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export async function fetchItems(): Promise<Item[]> {
    return await fetchData<Item[]>(`${BASE_URL}/api/items`);

}
export async function getLoggedInUser(): Promise<User> {
    return await fetchData<User>(`${BASE_URL}/api/users`);
}

export async function getCompletedItems(): Promise<Item[]> {
    return fetchData<Item[]>(`${BASE_URL}/api/items?isDone=true`)
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    try {
        const response = await axios.post<User>(
            `${BASE_URL}/api/users/signup`,
            credentials,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            switch (error.response.status) {
                case 409:
                    throw new ConflictError(error.response.data.message || "Unauthorized");
                default:
                    throw new Error(error.response.data.message || 'An error occurred');
            }
        } else {Error
            console.error(error);
            throw new Error("An unknwon error occurred");
        }
    }

}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    try {
        const response = await axios.post<User>(
            `${BASE_URL}/api/users/login`,
            credentials,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error("Login error.resopnse:: ", error.response);
            switch (error.response.status) {
                case 401:
                    throw new UnauthorizedError(error.response.data.message || 'Unauthorized');
                default:
                    throw new Error(error.response.data.message || 'An error occurred');
            }
        } else {Error
            console.error(error);
            throw new Error('An unknown error occurred');
        }
    }
}



export async function logout() {
    await axios.post(`${BASE_URL}/api/users/logout`, 
                    null, 
                    { withCredentials: true });
    
}

export interface ItemInput {
    isDone: boolean,
    content: string,
    createDate: number,
};

export async function createItem(item: ItemInput): Promise<Item> {
    try {
        console.log('Sending item:', item);
        const response = await axios.post(`${BASE_URL}/api/items`, item, {withCredentials: true });
        console.log('Response received:', response.data);
        return response.data;
    
    } catch (error) {
        console.error('Error creating data:', error);
        throw error;
    }

};

export async function completeItem(itemId: string) {
    try {
        console.log(itemId);
        const response = await axios.patch(
            `${BASE_URL}/api/items/${itemId}`,
            { isDone: true },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error completing item", error);
        throw error;
    }
}

export async function deleteItem(itemId: string) { 
    try {
        console.log(itemId);
        const response = await axios.delete(
            `${BASE_URL}/api/items/`+ itemId, 
            { withCredentials: true });
        return response.data;
     
    } catch (error) {
        console.error("Error delete item", error);
        throw error;
    }
}