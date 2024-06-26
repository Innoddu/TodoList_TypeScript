import './Todoitem.css'
import React, {useState, useRef, useEffect} from "react";
import {Item as ItemModel} from "../models/item";
interface TodoItemProps {
    item: ItemModel;
    onUpdate: (_id: string) => void;
    onDelete: (_id: string) => void;
    onComplete: (_id: string) => void;
    newItemId: string | null;

}

const Todoitem = ( { item, onUpdate, onDelete, onComplete, newItemId } : TodoItemProps) => {
    const [isCompleting, setIsCompleting] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);
    const containerRef =useRef<HTMLDivElement>(null);

    const {
        _id,
        isDone,
        content,
        createDate,
    } = item;

    useEffect( () => {
        if (isCompleting && containerRef.current && itemRef.current) {
            const height = itemRef.current.offsetHeight;
            containerRef.current.style.height = `${height}px`;
            setTimeout( () => {
                if (containerRef.current) containerRef.current.style.height = `0px`;
            }, 50)
        }
    }, [isCompleting]);

    const onChangeCheckBox = () => {
        onUpdate(_id);
    }

    const onChangeDelete = () => {
        const confirmDelete = window.confirm(`Are you sure to delete "${content}" ?`);
        if (confirmDelete){
            onDelete(_id);
        }
        
    }
    const onChangeComplete = () => {
        if (!isDone) {
            window.confirm(`You should complete "${content}" task!`);
        } else {
            setIsCompleting(true);
            setTimeout( () => onComplete(_id), 500);
            // onComplete(_id);
        }
    }
    return (
        <div className={`Todoitem-container ${_id === newItemId ? 'new-item' : ''}`}>
            <div ref={itemRef} className={`Todoitem ${isCompleting ? 'completing' : ''}`}>
                <div className="checkbox_col">
                    <input
                        onChange={onChangeCheckBox} 
                        checked={isDone} 
                        type="checkbox" 
                     />
                    </div>
                    <div className='title_col'>{content}</div>
                    <div className='date_col'>{new Date(createDate).toLocaleDateString()}</div>
                    <div className='btn_col_complete'><button onClick={onChangeComplete}>Complete</button></div>
                    <div className='btn_col_delete'><button onClick={onChangeDelete}>Delete</button></div>
            </div>
      </div>
    );
}

export default Todoitem;