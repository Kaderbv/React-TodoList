import React from 'react'
import { useState } from 'react';

const Content = () => {

  function handleNameChange()
  {
    const names =["Kader","Beevi","Ali"];
    const index = Math.floor(Math.random()*3)
    return names[index]
  } 
  
  const [userName, setName] = useState("Kader");

  function handleNameChangeDynamically()
  {
    const userNames =["NewKader","Beevi","Ali"];
    const index = Math.floor(Math.random()*3)
    //setName(prevName => userNames[index] )both correct
    setName(userNames[index] )
  } 

  //assigned on page load with default value 99
  const [count, setCount] = useState(99);//setCount used to change the state of the const count by passing it as parameter

  function onIncrement()
  {
    setCount(prevCount => prevCount+1); //as setCount receives count as parameter, we can have any local naming to modify the current state of the count
  }

  function onDecrement()
  {
   // setCount(count-1); also correct
   setCount(prevCount => prevCount-1);
  }

  const handleClick = (e) =>
  {
    console.log(e.target.innerText)
  }

  const handleClickNew = () =>
  {
    console.log("handleClickNew")
  }

  const handleClick2 = (initialText) =>
  {
    const names =["Raahina","Mohammed","Gani"];
    const index = Math.floor(Math.random()*3)
    console.log(initialText + " " + names[index])
  }
  
  return (
    <main>
        <p>Let us Welcome {handleNameChange()}</p>
      
        <p>Let us Welcome on Click {userName}</p>  <button onClick={handleNameChangeDynamically}>Change Name</button>
      
        <button onClick={() => handleClick2('Hello')}>Click</button>
        <br></br>
        <button onClick={(e) => handleClick(e)}>Event Click</button>
        <br></br>
        <button onClick={handleClickNew}>Click New</button>
        <button onClick={onDecrement}> - </button> {count} <button onClick={onIncrement}> + </button>
    </main>
  )
}

export default Content