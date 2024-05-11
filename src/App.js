
// import Content from './Content';
import Footer from './Footer';
import Header from './Header';
// import TodoListContent from './TodoListContent'
import Todo from './Todo'
import AddNewItem from './AddNewItem';
import { useState, useEffect } from 'react';
import SearchListItem from './SearchListItem';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('')
    const [searchItem, setSearchItem] = useState('')
    
    const handleSubmit = (e)=>
    {
        e.preventDefault();
        if(!newItem) 
            return;
        addItem()
        setNewItem('')
    }

    //Executed towards at the last of page rendering
    // useEffect(()=>
    // {
    //     console.log("renders always on page loads and on any action on page")
    // });

    // useEffect(()=>
    // {
    //     console.log("renders only on page load")
    // },[]);    

    useEffect(()=>
    {
        console.log("renders only when the state of the variable changes")
    },[items]);

    function addItem()
    {
        const id = items.length !==0 ? items[items.length-1].id + 1 : 1
        const addItem = {id, checked:false, name:newItem}
        const newListItems =[...items,addItem]
        saveInLocalStorage(newListItems)
    }

    function saveInLocalStorage(newListItems)
    {
        setItems(newListItems);
        localStorage.setItem("todo_list", JSON.stringify(newListItems))
    }
   
    function handleChange(itemId)
    {
        const newListItems = items.map(item =>
            item.id === itemId ? {...item, checked:!item.checked} : item
        );
        saveInLocalStorage(newListItems)
    }

    function handleDelete(deleteId)
    { 
        const newListItems = items.filter(item => item.id !== deleteId);
        saveInLocalStorage(newListItems)       
    }

   return (
    <div className="App">  
        <AddNewItem newItem={newItem}
            setNewItem={setNewItem}
            handleSubmit={handleSubmit}>
        </AddNewItem>
        <SearchListItem 
            searchItem={searchItem}
            setSearchItem={setSearchItem} ></SearchListItem>
        <Header title="To Do List Item"/>
        {/* <Content></Content> */}
        {/* <TodoListContent></TodoListContent> */}
        <Todo items={items.filter(item => (item.name.toLowerCase()).includes(searchItem.toLowerCase()))} 
          handleChange={handleChange}
          handleDelete={handleDelete} />
        <Footer length={items.length} ></Footer>
    </div>
  );
}

export default App;