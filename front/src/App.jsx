import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login"
import Home from './pages/Home'
import UploadPage from './pages/UploadPage'
import EditPage from './pages/EditPage'
import Account from './pages/Account'
import Register from './pages/Register'
import { useDispatch } from 'react-redux'
import { loadUser } from './action/userAction'
import { useEffect } from 'react'


function App() {

  const dispatch = useDispatch();

  const fetchUser = async () => {
    dispatch(loadUser())
  }

  useEffect(() => {
    fetchUser();
  },[])

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/upload/:id' element={<UploadPage />} />
        <Route path='/editpage/:id' element={<EditPage />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </BrowserRouter>
      {/* <Login /> */}
    </>
  )
}

export default App
