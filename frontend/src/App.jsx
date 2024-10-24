import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Postdetails from './pages/Postdetails'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import { UserContextProvider } from './context/UserContext'
import MyBlogs from "./pages/MyBlogs"

const App = () => {
  return (

    <UserContextProvider>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/write' element={<CreatePost />} />
        <Route exact path='/posts/post/:id' element={<Postdetails />} />
        <Route exact path='/edit/:id' element={<EditPost />} />
        <Route exact path="/myblogs/:id" element={<MyBlogs/>}/>
        <Route exact path='/profile/:id' element={<Profile />} />
      </Routes>
    </UserContextProvider>

  )
}

export default App
