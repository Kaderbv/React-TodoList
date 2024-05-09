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
                name: "Exercise quickly" 
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
        {items.length === 0 ? <p style={{marginTop:'2rem', color:'Highlight'}}>No items in to do list</p>  :
        <ul>
            {items.map(item=> 
                <li className='item' key={item.id}>
                    <input type="checkbox"
                    onChange={() => handleChange(item.id)} checked={item.checked}></input>
                    <label style={item.checked ? {textDecoration:'line-through'} : null}
                    > {item.name}</label> 
                    <FaTrashAlt role='button' tabIndex='0' onClick={() => handleDelete(item.id)} />                   
                </li>
            )}
        </ul>
        }
    </main>
  )
}

export default TodoListContent