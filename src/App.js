import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import HomePage from './components/Home/HomePage'
import HomePageAuthed from './components/Home/HomePageAuthed'
import TodoPage from './components/Home/TodoPage'
import LoginPage from './components/Auth/LoginPage'
import RegisterPage from './components/Auth/RegisterPage'

import { useSelector, useDispatch } from 'react-redux'
import { getLists } from './actions/listsActions';

function App() {
  const authed = true
  const dispatch = useDispatch()
  const lists = useSelector(state => state.lists.items)

  useEffect(() => {
      dispatch(getLists())
  }, [dispatch])

  return (
      <Router>
        <Switch>

          <Route exact path="/">
            {authed ? 
            <HomePageAuthed lists={lists} /> :
            <HomePage />}
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/register">
            <RegisterPage />
          </Route>

          {lists.map(list => {
            return (
              <Route key={list._id} path={`/${list.name}`}>
                <TodoPage todos={list.todos} listId={list._id} />
              </Route>
            )
          })}

        </Switch>
      </Router>
  )
}

export default App;
