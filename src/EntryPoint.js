import React, { useEffect } from 'react';
import { Provider } from 'react-redux'

import store from './store'
import { loadUser } from './flux/actions/authActions'
import App from './App';

export default function EntryPoint() {
  
  // load user for every fresh page
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
  )
}
