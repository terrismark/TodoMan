import React from 'react'

import HomePage from './components/Home/HomePage'
import HomePageAuthed from './components/Home/HomePageAuthed'
import TodoPage from './components/Home/TodoPage'
import LoginPage from './components/Auth/LoginPage'
import RegisterPage from './components/Auth/RegisterPage'



function App() {
  return (
    <>
    <LoginPage />
    <RegisterPage />
    <HomePage /> 
    <HomePageAuthed />
    <TodoPage />
    </>
  )
}

export default App;
