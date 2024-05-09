import React from 'react'
import { FaTrashAlt } from "react-icons/fa";  

const TodoListItem = ({item, handleChange, handleDelete}) => {
  return (
         <li className='item' key={item.id}>
            <input type="checkbox"
                onChange={() => handleChange(item.id)}
                checked={item.checked}>
            </input>
            <label
                style={item.checked ? { textDecoration: 'line-through' } : null}
                onDoubleClick={() => handleChange(item.id)}> 
                {item.name}
            </label>
            <FaTrashAlt role='button' tabIndex='0' 
                onClick={() => handleDelete(item.id)} 
                aria-label={`Delete ${item.id}`} />
        </li>   
    )
}

export default TodoListItem