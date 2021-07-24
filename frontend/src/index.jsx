import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GoogleMap from './Map/App' ;

const mapsApi = 'AIzaSyAVA4A4vIJ2dOrqQtcx69tMdKBDZWE0l4I';

const res = [App, GoogleMap];

ReactDOM.render(
    <div>
        <App key="main"/>,
        <GoogleMap key="map"/>,
    </div>,

  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
