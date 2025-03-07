import '../style/Todoitem.css'
import React, {useState, useRef, useEffect} from "react";
import {Item as ItemModel} from "../models/item";
import CustomModal from './CustomModal';
import Confetti from 'react-confetti';

interface TodoItemProps {
    item: ItemModel;
    onUpdate: (_id: string) => void;
    onDelete: (_id: string) => void;
    onComplete: (_id: string) => void;
    newItemId: string | null;

}

const Todoitem = ( { item, onUpdate, onDelete, onComplete, newItemId } : TodoItemProps) => {
    const [isCompleting, setIsCompleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);
    const containerRef =useRef<HTMLDivElement>(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showConfirmComplete, setShowConfirmComplete] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const {
        _id,
        isDone,
        content,
        createDate,
    } = item;

    useEffect( () => {
        if (isDeleted && containerRef.current && itemRef.current) {
            const height = itemRef.current.offsetHeight;
            containerRef.current.style.height = `${height}px`;
            setTimeout( () => {
                if (containerRef.current) containerRef.current.style.height = `0px`;
            }, 1000)
        }
    }, [isDeleted]);

    const onChangeCheckBox = () => {
        setIsCompleting(true);

    }

    const onChangeDelete = () => {
        setShowConfirmDelete(true);
    };

    const handleDeleteConfirmed = () => {
            setIsDeleted(true);
            setShowConfirmDelete(false);
            setTimeout( ()=> onDelete(_id), 5000)
    };

    
    const onChangeComplete = () => {
        if (!isDone) {
            setShowConfirmComplete(true);
        } else {
            onUpdate(_id);
            setTimeout(() => onComplete(_id), 500);
        }
    }

    const handleCompleteConfirmed = () => {
        setIsCompleting(true);
        onUpdate(_id);
        // 먼저 폭죽 효과 실행
        setShowConfetti(true);
        // 2초 후에 onComplete 호출하여 아이템을 삭제하고 폭죽 효과 숨김
        setTimeout(() => {
          onComplete(_id);
          setTimeout(() => setShowConfetti(false), 8000);
        }, 4000);

        setShowConfirmComplete(false);
    };

    
    return (
        <div className={`Todoitem-container ${_id === newItemId ? 'new-item' : ''}`} ref={containerRef}>
            {showConfetti && (
                <div
                    style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    }}
                >
                    <Confetti 
                        width={window.innerWidth}
                        height={window.innerHeight}
                        numberOfPieces={1000} 
                        recycle={true}      
                    />
                </div>
                )}
            <div ref={itemRef} className={`Todoitem ${isDeleted ? 'deleted' : ''}  ${isDone ? 'completed' : ''}`}>
                <div className="checkbox_col">
                    <input
                        onChange={onChangeCheckBox}
                        checked={isDone} 
                        type="checkbox" 
                     />
                    </div>
                    <div className='title_col'>{content}</div>
                    <div className='date_col'>{new Date(createDate).toLocaleDateString()}</div>
                    <div className='btn_col_complete'><button onClick={onChangeComplete} disabled={isDone}>Complete</button></div>
                    <div className='btn_col_delete'><button onClick={onChangeDelete}>Delete</button></div>
                    <CustomModal
                        show={showConfirmComplete}
                        message={`Are you sure you want to mark "${content}" as complete?`}
                        onConfirm={handleCompleteConfirmed}
                        onCancel={() => setShowConfirmComplete(false)}
                        confirmLabel="Confirm"   
                        cancelLabel="Cancel"
                    />
                    <CustomModal
                        show={showConfirmDelete}
                        message={`Are you sure to delete "${content}" ?`}
                        onConfirm={handleDeleteConfirmed}
                        onCancel={() => setShowConfirmDelete(false)}
                        confirmLabel="Delete"   
                        cancelLabel="Cancel"
                    />
            </div>
      </div>
    );
}

export default Todoitem;