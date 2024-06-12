import { ChangeEvent, useState } from "react";
import Todoitem from './Todoitem';
import './Todolist.css'

interface TodoItemProps {
    id: number;
    isDone: boolean;
    content: string;
    createDate: number;
  }

interface TodoListProps {
    todo: TodoItemProps[];
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
}


const Todolist = ({ todo, onUpdate, onDelete } : TodoListProps) => {

    // Filtering User Input
    const [search, setSearch] = useState("");
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const getSearchResult = () => {
        return search === "" 
        ? todo
        : todo.filter((it) =>  it.content.toLowerCase().includes(search.toLowerCase()));
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
                {/* {
                    todo.map( (it) => (<Todoitem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete} />))
                } */}
                {
                /* Read Rendering to Todoitem itereate through todo props */
                /* key value is unique id */
    
                // Get Search
                getSearchResult().map( (it) => (<Todoitem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete} />))
                   
                }
          
              
            </div>
        </div>
    );
}

export default Todolist;