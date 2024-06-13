import { Item } from "../models/item";
import axios from 'axios';

async function fetchData(url: string) {
    try {
      const response = await axios.get(url);
      console.log(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
  };
  


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
