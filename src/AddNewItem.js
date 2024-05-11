import React from 'react'
import {FaPlus} from 'react-icons/fa'
import { useRef } from 'react'

const AddNewItem = ({newItem, setNewItem, handleSubmit}) => {
  const inputRef = useRef();

  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor='addItem'>Add New Item</label>
        <input 
            id='addItem'
            type='text' 
            ref={inputRef}
            placeholder='Add New Item' 
            value={newItem}
            onChange={(e)=>setNewItem(e.target.value)}
            required>
        </input>
        <button type='submit' 
            aria-label='Add New Item'
            onClick={() => inputRef.current.focus()}>
            <FaPlus />
        </button>
    </form>
  )
}

export default AddNewItem