import React from 'react'
import TodoListItem from './TodoListItem'

const TodoList = ({items, handleChange, handleDelete}) => {
  return (
    <ul>
        {items.map(item=> 
            <TodoListItem 
                item={item} 
                key={item.id}
                handleChange={handleChange} 
                handleDelete={handleDelete}>
            </TodoListItem>
        )}
    </ul>
  )
}

export default TodoList