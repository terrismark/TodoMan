import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import HomePage from './components/Home/HomePage'
import HomePageAuthed from './components/Home/HomePageAuthed'
import TodoPage from './components/Home/TodoPage'
import LoginPage from './components/Auth/LoginPage'
import RegisterPage from './components/Auth/RegisterPage'
import PageNotFound from './components/ErrorPages/PageNotFound'
import LoadingPage from './components/Home/LoadingPage'

import { useSelector, useDispatch } from 'react-redux'
import { getLists } from './flux/actions/listsActions';

export default function App() {
  const dispatch = useDispatch()

  // user
  const auth = useSelector(state => state.auth)
  const [ authed, setAuthed ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ username, setUsername ] = useState(null)

  // lists
  const lists = useSelector(state => state.lists.items)

  useEffect(() => {
    if (auth.isAuthed) {
      dispatch(getLists())
      setAuthed(auth.isAuthed)
      setUsername(auth.user.username)
    } 
    setLoading(auth.isLoadingUser)
  }, [dispatch, auth])

  return (
      <Router>
        {authed ? 
          <Switch>

              <Route exact path="/">
                {loading ? 
                  <LoadingPage /> 
                  :
                  <HomePageAuthed lists={lists} username={username}/> 
                }
              </Route>

              <Route exact path="/notfound">
                <PageNotFound />
              </Route>
              
              {lists.map(list => {
                return (
                  <Route exact key={list._id} path={`/${list.name}`}>
                    <TodoPage name={list.name} todos={list.todos} listId={list._id} />
                  </Route>
                )
              })}

              <Redirect to="/notfound" />

          </Switch> 
          :
          <Switch>

            <Route exact path="/">
              {loading ? 
                <LoadingPage /> 
                :
                <HomePage /> 
              }
            </Route>

            <Route exact path="/login">
              <LoginPage />
            </Route>

            <Route exact path="/register">
              <RegisterPage />
            </Route>

            <Route exact path="/notfound">
              <PageNotFound />
            </Route>

            <Redirect to="/notfound"/>

        </Switch>}
      </Router>
  )
}
