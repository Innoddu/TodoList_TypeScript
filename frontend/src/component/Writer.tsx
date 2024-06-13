import './Writer.css'
import React, {useState, useRef, ChangeEvent, KeyboardEvent} from 'react'

interface WriterProps {
    onCreate: (content: string) => void,
}



const Writer = ({ onCreate } : WriterProps) => {

    const [textTodo, setTextTodo] = useState("");

    // User input todo
    const onChangeSetTextTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setTextTodo(e.target.value);
    };
    
    const inputRef =  useRef<HTMLInputElement | null>(null);
    const onSubmit = () => {
        console.log("onSubmit called with textTodo:", textTodo); // 디버그용 로그 추가
        // If the input is empty, can't add in the list
        if (!textTodo) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
            return;
        }
        // Create Todo
        onCreate(textTodo);
        // Clear Input text
        setTextTodo("");
        // alert("Completely Added !");
    };

    // Add Todo List with Enter Key
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    }


    return (
        <div className="Writer">
            <h4>Add your ToDo ✏️</h4>
            <div className="editor_wrapper">
                <input 
                ref={inputRef} 
                value={textTodo} 
                onChange={onChangeSetTextTodo}
                onKeyDown={onKeyDown}
                placeholder="New Todo...." />
                <button onClick={onSubmit}>add</button>
            </div>
        </div>
    );
}

export default Writer;