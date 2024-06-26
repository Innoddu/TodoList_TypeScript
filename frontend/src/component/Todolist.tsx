import { ChangeEvent, useState } from "react";
import {Item, Item as ItemModel} from "../models/item";
import Todoitem from './Todoitem';
import './Todolist.css'

interface TodoItemProps {
    item: ItemModel[];
    onUpdate: (_id: string) => void;
    onDelete: (_id: string) => void;
    onComplete: (_id: string) => void;
    newItemId: string | null;

  }


const Todolist = ({ item, onUpdate, onDelete, onComplete, newItemId } : TodoItemProps) => {

    // Filtering User Input
    const [search, setSearch] = useState("");
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const getSearchResult = () => {
        return search === "" 
        ? item
        // : todo.filter((it: ItemModel) =>  it.content.toLowerCase().includes(search.toLowerCase()));
        : item.filter(item => item.content.toLowerCase().includes(search.toLowerCase()));
    };

    return (
        <div className="Todolist">
            <h4>Todo List🌱</h4>
            <input
            value={search} 
            onChange={onChangeSearch}
            className="TodoSearch"
            placeholder="Type..." />
            <div className='list_wrapper'>
                {
                    getSearchResult().map( (item: ItemModel) => (
                        <Todoitem key={item._id} item={item} onUpdate={onUpdate} onDelete={onDelete} onComplete={onComplete} newItemId={newItemId} />
                    ))
                }
            </div>
        </div>
    );
}

export default Todolist;