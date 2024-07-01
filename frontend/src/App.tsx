import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import store from './store'
import { ProtectedRoutes } from './routes/ProtectedRoutes'




const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes >
        <Route
          path="/"
          element={ <ProtectedRoutes><ChatPage /></ProtectedRoutes> 
          }
        />
          <Route path='login' element={<LoginPage />}  />
          <Route path='register' element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>



  )
}

export default App