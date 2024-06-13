import './App.css';
import React, { useState, useRef } from 'react'
import Header from './component/Header'
import Writer from './component/Writer'
import Todolist from './component/Todolist'
import  { ItemInput } from './network/item_api'
import  * as ItemApi from './network/item_api'


interface TodoItemProps {
  id: number;
  isDone: boolean;
  content: string;
  createDate: number;
}


// const mockTodo: TodoItemProps[] = [
//   {
//     id: 0,
//     isDone: false,
//     content: "Studying React",
//     // createDate: new Date().getTime(),
//   },
//   {
//     id: 1,
//     isDone: false,
//     content: "Lundurying",
//     // createDate: new Date().getTime(),
//   },
//   {
//     id: 2,
//     isDone: true,
//     content: "FastAPI",
//     // createDate: new Date().getTime(),
//   }

// ]


function App() {
  // Create todo
  const idRef = useRef(0);
  const [todo, setTodo] = useState<TodoItemProps[]>([]);

  const onCreate = async (content: string) => {
    const newItem: ItemInput = {
      id: idRef.current,
      isDone: false,
      content,
      createDate: new Date().getTime(),
    };

    try {
      const createdItem = await ItemApi.createItem(newItem);
      
      setTodo([{
        id: createdItem.id,
        isDone: false,
        content: createdItem.content,
        createDate: createdItem.createDate,
      }, ...todo]);
      
      idRef.current += 1;
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };



  // Toggle Update 
  const onUpdate = (targetId: number) => {
    setTodo(
      todo.map( (it) => {
        if (it.id === targetId) {
          return {
            ...it,
            isDone: !it.isDone,
          };
        } else {
          return it;
        }
    })
    );
  };

  // Delete Todo
  const onDelete = (targetId: number) => {
      setTodo( todo.filter( (it) => it.id !==targetId ));
  };



  return (
    <div className="App">
          <Header />
          <Writer onCreate={onCreate}/>
          <Todolist todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;
