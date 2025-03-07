import React, { useState, useRef, useEffect } from 'react'
import  * as ItemApi from '../network/item_api'
import Header from '../component/Header';
import Writer from '../component/Writer';
import Todolist from '../component/Todolist';
import  { ItemInput } from '../network/item_api';
import { Item as ItemModel } from '../models/item';


const ItemPageLoggedInView = () => {
    const idRef = useRef(0);
    const [todo, setTodo] = useState<ItemModel[]>([]);
    const [newItemId, setNewItemId] = useState<string | null>(null);

  
   //  Render current todo list
    useEffect( () => {
      async function loadItems() {
        try {
          const items = await ItemApi.fetchItems();
          setTodo(items.filter(item => !item.isDone));
    
        } catch (error) {
          console.error(error);
        } 
      }
      loadItems();
    }, []);
  
  
    const onCreate = async (content: string) => {
      const newItem: ItemInput = {
        isDone: false,
        content,
        createDate: new Date().getTime(),
      };
    
      try {
        const createdItem = await ItemApi.createItem(newItem);
        setTodo(prevTodo => [createdItem, ...prevTodo]);
        setNewItemId(createdItem._id); // 새로 추가된 항목의 ID를 저장
        setTimeout( () => setNewItemId(null), 10);
        idRef.current += 1;
      } catch (error) {
        console.error('Error creating item:', error);
      }
    };
  
  
  
    // Toggle Update 
    const onUpdate = (_id: string) => {
      setTodo(
        todo.map( (it) => {
          if (it._id === _id) {
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
  
  
    async function onComplete(_id: string) {
      try {
        await ItemApi.completeItem(_id);
        setTodo( todo.filter(
          it => it._id !== _id
        ));
      } catch (error) {
        console.error("Complete error");
        alert(error);
      }
    }
  
  
  
  
    async function onDelete(_id: string) {
      try {
        await ItemApi.deleteItem(_id);
        setTodo( todo.filter( it => it._id !== _id));
      } catch (error) {
        console.error("delete error");
        alert(error);
      }
    }
    return (
        <>
            <Header />
            <Writer onCreate={onCreate}/>
            <Todolist item={todo} onUpdate={onUpdate} onDelete={onDelete} onComplete={onComplete} newItemId={newItemId} />
        </>
    );
}

export default ItemPageLoggedInView;