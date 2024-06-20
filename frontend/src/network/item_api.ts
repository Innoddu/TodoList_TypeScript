import { Item } from "../models/item";
import axios from 'axios';

async function fetchData<T>(url: string): Promise<T> {
    try {
        const response = await axios.get<T>(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data!!!!!:', error);
        throw error;
    }
}
  
  export async function fetchItems(): Promise<Item[]> {
    return await fetchData<Item[]>("http://localhost:5005/api/items");

}

export interface ItemInput {
    id: number,
    isDone: boolean,
    content: string,
    createDate: number,
};

export async function createItem(item: ItemInput): Promise<Item> {
    try {
        const response = await axios.post("http://localhost:5005/api/items", item);
        return response.data;
    
    } catch (error) {
        console.error('Error creating data:', error);
        throw error;
    }

};

export async function deleteItem(itemId: string) { 
    await await axios.post("http://localhost:5005/api/items/" + itemId);
}