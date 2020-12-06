import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

import HomePage from './components/Home/HomePage'
import HomePageAuthed from './components/Home/HomePageAuthed'
import TodoPage from './components/Home/TodoPage'
import LoginPage from './components/Auth/LoginPage'
import RegisterPage from './components/Auth/RegisterPage'

function App() {
  return (
    <Provider store={store}>
      {/* <LoginPage /> */}
      {/* <RegisterPage /> */}
      {/* <HomePage />  */}
      {/* <HomePageAuthed /> */}
      <TodoPage />
    </Provider>
  )
}

export default App;
