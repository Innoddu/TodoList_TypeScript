import { ChangeEvent, useState } from "react";
import {Item, Item as ItemModel} from "../models/item";
import Todoitem from './Todoitem';
import './Todolist.css'

interface TodoItemProps {
    items: ItemModel[];
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
  }


const Todolist = ({ items, onUpdate, onDelete } : TodoItemProps) => {

    // Filtering User Input
    const [search, setSearch] = useState("");
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const getSearchResult = () => {
        return search === "" 
        ? items
        // : todo.filter((it: ItemModel) =>  it.content.toLowerCase().includes(search.toLowerCase()));
        : items.filter(item => {item.content.toLowerCase().includes(search.toLowerCase())})
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
                        <Todoitem key={item.id} items={item} onUpdate={onUpdate} onDelete={onDelete}/>
                    ))
                }
          
              
            </div>
        </div>
    );
}

export default Todolist;