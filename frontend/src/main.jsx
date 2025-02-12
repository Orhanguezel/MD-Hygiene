// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './app/store';
import { ToastContainer } from "react-toastify";
import './index.css';
import '@coreui/coreui/dist/css/coreui.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
      <ToastContainer />
      <App />
      </Provider>
  </React.StrictMode>
);
