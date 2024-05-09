import React from 'react'

const Footer = ({length}) => {

  //const year = new Date();
  
  return (
    // <footer>Copyright &copy; {year.getFullYear()} </footer>
    <footer>Todo {length} {length > 1 ? "items" : "item" }</footer>
  )
}

export default Footer