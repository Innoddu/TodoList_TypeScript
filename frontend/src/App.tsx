import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import Header from './component/Header'
import Writer from './component/Writer'
import Todolist from './component/Todolist'
import  { ItemInput } from './network/item_api'
import  * as ItemApi from './network/item_api'
import { Item as ItemModel } from './models/item'


// interface TodoItemProps {
//   id: number;
//   isDone: boolean;
//   content: string;
//   createDate: number;
// }



function App() {
  // Create todo
  const idRef = useRef(0);
  const [todo, setTodo] = useState<ItemModel[]>([]);

  useEffect( () => {
    async function loadItems() {
      try {
        const items = await ItemApi.fetchItems();
        setTodo(items);
        idRef.current = items.length ? Math.max(...items.map(item => item.id)) + 1 : 0;
      } catch (error) {
        console.error(error);
      } 
    }
    loadItems();
  }, []);

  const onCreate = async (content: string) => {
    const newItem: ItemInput = {
      id: idRef.current,
      isDone: false,
      content,
      createDate: new Date().getTime(),
    };

    try {
      const createdItem = await ItemApi.createItem(newItem);
      
      setTodo([createdItem, ...todo]);
      
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
          <Todolist items={todo} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;
