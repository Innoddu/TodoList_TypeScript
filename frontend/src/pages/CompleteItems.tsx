import React, { useState, useEffect } from "react";
import { Item } from "../models/item"; 
import * as ItemApi from "../network/item_api";
import CompleteList from "../component/CompleteList";


const CompletedItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCompletedItems() {
            try {
                const completedItems = await ItemApi.getCompletedItems();
                setItems(completedItems);
            } catch (error: any) {
        
            console.error(error);
            setError("Failed to load completed tasks.");
        }}
        fetchCompletedItems();
    }, []);


    return (
        <CompleteList items={items} />
      );
}
export default CompletedItems;