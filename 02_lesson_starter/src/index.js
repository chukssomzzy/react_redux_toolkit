import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { userApiSlice } from './features/users/usersSlice'
import { extendedApiSlice } from './features/posts/postSlice.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

store.dispatch(userApiSlice.endpoints.getUsers.initiate())
store.dispatch(extendedApiSlice.endpoints.getPost.initiate())
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
        <Routes>
            <Route path= "/*" element={ <App /> } />
        </Routes>
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);            
