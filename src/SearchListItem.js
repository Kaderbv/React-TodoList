import React from 'react'

const SearchListItem = ({searchItem,setSearchItem}) => {
  return (
    <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor='search'>Search</label>
        <input type='text'
            id='search' 
            role = 'search' 
            value={searchItem}
            onChange={(e)=>setSearchItem(e.target.value)}
            placeholder='Search Item' ></input>
    </form> 
  )
}

export default SearchListItem