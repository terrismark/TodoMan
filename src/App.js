import React, { useEffect, useState, Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getLists } from './flux/actions/listsActions';

// import HomePage from './components/Home/HomePage'
// import HomePageAuthed from './components/Home/HomePageAuthed'
// import TodoPage from './components/Home/TodoPage'
// import LoginPage from './components/Auth/LoginPage'
// import RegisterPage from './components/Auth/RegisterPage'
// import PageNotFound from './components/ErrorPages/PageNotFound'
import LoadingPage from './components/Home/LoadingPage'

const HomePage = lazy(() => import('./components/Home/HomePage'));
const HomePageAuthed = lazy(() => import('./components/Home/HomePageAuthed'));
const TodoPage = lazy(() => import('./components/Home/TodoPage'));
const LoginPage = lazy(() => import('./components/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./components/Auth/RegisterPage'));
const PageNotFound = lazy(() => import('./components/ErrorPages/PageNotFound'));

export default function App() {
  const dispatch = useDispatch()

  // user
  const auth = useSelector(state => state.auth)
  const [ authed, setAuthed ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ username, setUsername ] = useState(null)

  // lists
  const lists = useSelector(state => state.lists.items)
  const [ listCount, setListCount ] = useState(0)

  useEffect(() => {
    if (auth.isAuthed) {
      setAuthed(auth.isAuthed)
      setUsername(auth.user.username)
      dispatch(getLists())
      setListCount(auth.user.listCount)
    } 
    setLoading(auth.isLoadingUser)
  }, [dispatch, auth])

  return (
      <Router>
        {authed ? 
        <Suspense fallback={<LoadingPage />}>
            <Switch>

                <Route exact path="/">
                  {loading ? 
                    <LoadingPage /> 
                    :
                    <HomePageAuthed lists={lists} username={username}/> 
                  }
                </Route>
                
                {lists.map(list => {
                  return (
                    <Route exact key={list._id} path={`/${list.name}`}>
                      <TodoPage name={list.name} listCount={listCount} todos={list.todos} listId={list._id} />
                    </Route>
                  )
                })}

                <Redirect to="/" />

            </Switch> 
        </Suspense>
          :
          <Suspense fallback={<LoadingPage />}>
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

          </Switch>
        </Suspense>}
      </Router>
  )
}
