
// import Content from './Content';
import Footer from './Footer';
import Header from './Header';
// import TodoListContent from './TodoListContent'
import Todo from './Todo'
import AddNewItem from './AddNewItem';
import { useState, useEffect } from 'react';
import SearchListItem from './SearchListItem';
import appCRUDRequest from './appCRUDRequest';

function App() {
    //pass empty array so that if data fails to read from db or any storage , it doesn't crash the application
    //const [items, setItems] = useState(JSON.parse(localStorage.getItem("todo_list")) || []);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('')
    const [searchItem, setSearchItem] = useState('')    
    const [errorLog, setErrorLog] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const API_URL = 'http://localhost:3500/items'
    
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
            finally{
                setIsLoading(false);
            }
        }       
      
        // calling the fetchItems method
        (async () => await fetchItems())()
    },[]);

    const addItem = async () =>
    {
        const id = items.length !==0 ? items[items.length-1].id +1 : 1
        const addItem = {id, checked:false, name:newItem}
        const newListItems =[...items,addItem]
        //Add New items to DB
        const postOptions ={
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(addItem)
        }
        const addItemAPIResponse = await appCRUDRequest(API_URL, postOptions)
        if(!addItemAPIResponse)
            setErrorLog(addItemAPIResponse)
        //ends
        saveInLocalStorage(newListItems)
    }

    function saveInLocalStorage(newListItems)
    {
        setItems(newListItems);
       // localStorage.setItem("todo_list", JSON.stringify(newListItems))
    }
    
      
    const handleChange = async (itemId) =>
    {
        const updatedListItems = items.map(item =>
            item.id === itemId ? {...item, checked:!item.checked} : item
        );
    
        //Update an item in DB
        const updatedItem = items.filter(item => item.id === itemId);
        const updateURL = `${API_URL}/${itemId}` //`/search?q=${encodeURIComponent(searchQuery)}`
        const updateOptions ={
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({checked:updatedItem[0].checked})
        }
        const updatedItemAPIResponse = await appCRUDRequest(updateURL, updateOptions)
        if(!updatedItemAPIResponse)
            setErrorLog(updatedItemAPIResponse)
        //ends

        saveInLocalStorage(updatedListItems)
    }

    const handleDelete = async (deleteItemId) =>
    { 
        const modifiedListItems = items.filter(item => item.id !== deleteItemId);

         //Delete an item in DB
         const deleteURL = `${API_URL}/:id`
         const deleteOptions ={
             method : 'DELETE'           
         }
         const deletedItemAPIResponse = await appCRUDRequest(deleteURL, deleteOptions)
         if(!deletedItemAPIResponse)
             setErrorLog(deletedItemAPIResponse)
         //ends

        saveInLocalStorage(modifiedListItems)       
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
            {isLoading && <p>Loading Items</p>}
            {!isLoading && !errorLog &&
                <Todo items={items.filter(item => (item.name.toLowerCase()).includes(searchItem.toLowerCase()))} 
                handleChange={handleChange}
                handleDelete={handleDelete} />
            }
        </main>
        <Footer length={items.length} ></Footer>
    </div>
  );
}

export default App;