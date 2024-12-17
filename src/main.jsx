import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import 'modern-normalize';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
         <Toaster position="top-right" reverseOrder={false} />         
            <App />
      </PersistGate>
    </BrowserRouter>
    </Provider>
  // </React.StrictMode>,
);
