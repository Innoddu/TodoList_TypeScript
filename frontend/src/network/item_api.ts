import { Item } from "../models/item";
import { User } from "../models/user";
import axios from 'axios';

// Heroku base url
// const BASE_URL = 'http://localhost:5005';
const BASE_URL = 'https://app-todolist-395378bec3eb.herokuapp.com' || 'http://localhost:5005/api/items';



async function fetchData<T>(url: string): Promise<T> {
    try {
        const response = await axios.get<T>(url,  { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching data!!!!!:', error);
        throw error;
    }
}

export async function fetchItems(): Promise<Item[]> {
    return await fetchData<Item[]>("http://localhost:5005/api/items");

}
export async function getLoggedInUser(): Promise<User> {
    return await fetchData<User>("http://localhost:5005/api/users");
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await axios.post("http://localhost:5005/api/users/signup", credentials, {withCredentials: true });
    return response.data;
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials) {
    const response = await axios.post("http://localhost:5005/api/users/login", credentials, {withCredentials: true });
    return response.data;
}

export async function logout() {
    await axios.post("http://localhost:5005/api/users/logout")
    
}

export interface ItemInput {
    isDone: boolean,
    content: string,
    createDate: number,
};

export async function createItem(item: ItemInput): Promise<Item> {
    try {
        console.log('Sending item:', item);
        const response = await axios.post("http://localhost:5005/api/items", item, {withCredentials: true });
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
        const response = await axios.patch("http://localhost:5005/api/items" + itemId);
        return response.data;
     
    } catch (error) {
        console.error("Error complete item", error);
        throw error;
    }
}

export async function deleteItem(itemId: string) { 
    await axios.delete("http://localhost:5005/api/items" + itemId);
}