import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'

import HomePage from './components/Home/HomePage'
import HomePageAuthed from './components/Home/HomePageAuthed'
import TodoPage from './components/Home/TodoPage'
import LoginPage from './components/Auth/LoginPage'
import RegisterPage from './components/Auth/RegisterPage'

function App() {
  const auth = true

  return (
    <Provider store={store}>
      <Router>
        <Switch>

          <Route exact path="/">
            {auth ? 
            <HomePageAuthed /> :
            <HomePage />}
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/register">
            <RegisterPage />
          </Route>

          <Route path="/todospage">
            <TodoPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;
