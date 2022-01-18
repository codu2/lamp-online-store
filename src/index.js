import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthContextProvider } from './store/auth-context';
import store from './store/index';

ReactDOM.render(<AuthContextProvider><BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter></AuthContextProvider>, document.getElementById('root'));
