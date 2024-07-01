import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const NavBar = () => {
    const { user } = useAuthContext()
  return (
    <>
        <nav>
            {
                !user ? <li>  
                    <Link to={'/login'}>Login</Link>
                 <Link to={'/register'}>Register</Link></li>
                : <li> <Link to={'/logout'}>logout</Link></li>
            }   
          
        </nav>
    </>
  )
}

export default NavBar