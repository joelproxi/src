import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { authSelectorState } from '../store/selectors/AuthSelector'
import { logoutAction } from '../store/actions/AuthAction';
import { useEffect } from 'react';


const NavBar = () => {
  const { user } = useSelector(authSelectorState);
  const dispatch = useDispatch();

  const logout =  () => {
     dispatch(logoutAction() as any);
     if(user?.success){
      <Navigate to={'login'} />
      }
  }

  useEffect(() => {
  }, [user])
  
  return (
    <nav>
      {
        !user ? <li>  
            <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link></li>
        : <li> <Link to={''} onClick={() => logout()}>logout</Link></li>
      }   
    </nav>

  )
}

export default NavBar;