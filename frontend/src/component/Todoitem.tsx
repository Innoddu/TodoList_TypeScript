import './Todoitem.css'
import {Item as ItemModel} from "../models/item";
interface TodoItemProps {
    item: ItemModel;
    onUpdate: (_id: string) => void;
    onDelete: (_id: string) => void;
}

const Todoitem = ( { item, onUpdate, onDelete } : TodoItemProps) => {
    const {
        _id,
        isDone,
        content,
        createDate,
    } = item;
    const onChangeCheckBox = () => {
        onUpdate(_id);
    }
    const onChangeDelete = () => {
        const confirmDelete = window.confirm(`Are you sure to delete "${content}" ?`);
        if (confirmDelete){
            onDelete(_id);
        }
        
    }
    return (
        <div className="Todoitem">
            <div className="checkbox_col">
                <input
                onChange={onChangeCheckBox} 
                checked={isDone} 
                type="checkbox" />
            </div>
            <div className='title_col'>{content}</div>
            <div className='date_col'>{new Date(createDate).toLocaleDateString()}</div>
            <div className='btn_col'>
                <button onClick={onChangeDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Todoitem;