import React from 'react'
import {FaPlus} from 'react-icons/fa'

const AddNewItem = ({newItem, setNewItem, handleSubmit}) => {
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor='addItem'>Add New Item</label>
        <input 
            id='addItem'
            type='text' 
            placeholder='Add New Item' 
            value={newItem}
            onChange={(e)=>setNewItem(e.target.value)}
            required>
        </input>
        <button type='submit' 
            aria-label='Add New Item'>
            <FaPlus />
        </button>
    </form>
  )
}

export default AddNewItem