import React from 'react'

const Layout = props => (
  <div>
    <h1>Family Menu</h1>
    <h5>The fondest memories are made when gathered around the table!</h5>

    {props.children}

  </div>
)

export default Layout
