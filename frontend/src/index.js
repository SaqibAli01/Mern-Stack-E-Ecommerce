import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store/store';

//redux used
// import store from '../redux/store/store';

//React Alert used ,,,is ko yaha used krny sy sy pury project me kahi be used kr skty ha
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  // position: positions.TOP_CENTER,
  transition: transitions.SCALE,
  
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>

      <App />
    </AlertProvider>
  </Provider>
);


