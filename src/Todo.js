import React from 'react'
import TodoList from './TodoList'

const Todo = ({items, handleChange, handleDelete}) => {
  return (
    <main>
        {
          items.length === 0 
            ? <p style={{marginTop:'2rem', color:'Highlight'}}>No items in to do list</p>  
            : <TodoList items={items} handleChange={handleChange} handleDelete={handleDelete}></TodoList> 
        }
    </main>
  )
}

export default Todo