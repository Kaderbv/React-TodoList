
// import Content from './Content';
import Footer from './Footer';
import Header from './Header';
// import TodoListContent from './TodoListContent'
import Todo from './Todo'
import AddNewItem from './AddNewItem';
import { useState, useEffect } from 'react';
import SearchListItem from './SearchListItem';

function App() {
    //pass empty array so that if data fails to read from db or any storage , it doesn't crash the application
    //const [items, setItems] = useState(JSON.parse(localStorage.getItem("todo_list")) || []);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('')
    const [searchItem, setSearchItem] = useState('')    
    const [errorLog, setErrorLog] = useState(null)
    const API_URL = 'http://localhost:3500/itewms'
    
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

    // useEffect(()=>
    // {
    //     console.log("renders only when the state of the variable changes")
    // },[items]);

    useEffect(()=>
    {
        const fetchItems = async ()=>
        {
            try {
                const response = await fetch(API_URL)
                if(!response.ok) throw Error("Data not found")
                const dbListItems = await response.json()
                console.log("calling db");
                setItems(dbListItems);
                // saveInLocalStorage(dbListItems)
            } catch (error) {
                setErrorLog(error.message)
                //console.log(error.stack)
            }
        }
        

        (async () => await fetchItems())()
    },[]);

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
        {/* <Content></Content> */}    {/* <TodoListContent></TodoListContent> */}
        <main>
            {errorLog && <p>{`Error: ${errorLog}`}</p>}
            <Todo items={items.filter(item => (item.name.toLowerCase()).includes(searchItem.toLowerCase()))} 
            handleChange={handleChange}
            handleDelete={handleDelete} />
        </main>
        <Footer length={items.length} ></Footer>
    </div>
  );
}

export default App;