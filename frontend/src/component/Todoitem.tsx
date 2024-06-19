import './Todoitem.css'
import {Item as ItemModel} from "../models/item";
interface TodoItemProps {
    items: ItemModel;
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
}

const Todoitem = ( { items, onUpdate, onDelete } : TodoItemProps) => {
    const {
        id,
        isDone,
        content,
        createDate,
    } = items;
    const onChangeCheckBox = () => {
        onUpdate(id);
    }
    const onChangeDelete = () => {
        onDelete(id);
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