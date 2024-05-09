
import React from 'react'

const Header = ({title ="Default Title"}) => {
  return (
    <header>
      {title}
    </header>
  )
}

// Header.defaultProps = {
//   title: "Default Title"
// }
export default Header