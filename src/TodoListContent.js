import React from 'react'
import { useState } from 'react' 
import { FaTrashAlt } from "react-icons/fa";  

const TodoListContent = () => {

    const [items, setItems]=useState(
        [
            {
                id:1,
                checked:true,
                name: "Practice React" 
            },
            {
                id:2,
                checked:false,
                name: "Exercise" 
            },
            {
                id:3,
                checked:false,
                name: "Read book" 
            }           
        ]
    );

    function handleChange(itemId)
    {
        const newListItems = items.map(item =>
            item.id === itemId ? {...item, checked:!item.checked} : item
        );
        setItems(newListItems);
    }

    function handleDelete(deleteId)
    { 
        const newListItems = items.filter(item => item.id !== deleteId);
        setItems(newListItems);        
    }
  
    
  return (
    <main>
        <ul>
            {items.map(item=> 
                <li className='item' key={item.id}>
                    <input type="checkbox" onChange={() => handleChange(item.id)} checked={item.checked}></input>
                    <label> {item.name}</label> 
                    <FaTrashAlt role='button' tabIndex='0' onClick={() => handleDelete(item.id)} />                   
                </li>
            )}
        </ul>
    </main>
  )
}

export default TodoListContent