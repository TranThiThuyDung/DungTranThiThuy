import React from 'react'
import {Link,Outlet} from "react-router-dom"
function Layout() {
  return (
    <>
      <ul className='layout'>
        <li>
          <Link to="/home">Xin Chào, {localStorage.getItem('username')}</Link>
        </li>
        <li>
          <Link to="/data">USERS</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    <Outlet />
  </>
    )
}

export default Layout