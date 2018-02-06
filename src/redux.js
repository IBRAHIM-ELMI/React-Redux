import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createData, dataReceived } from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';


  

export function fetchData(mqtt){
    return function(dispatch){
      mqtt.on("message", function(topic, message) {
        var obj = JSON.parse(message);
        let type = topic.split('/')[1];
        let data = {
          'url' : mqtt.options.href,
          'type' : type,
          'value' : obj.value
        };
        dispatch(createData(data));
      });
    }
  }
let liste=[];

const store = createStore(
    liste,
    applyMiddleware(thunkMiddleware)
  );
  store.subscribe(() =>
    console.log(store.getState())
  )

  ReactDOM.render(
      <Provider store={store}>
          <App />
      </Provider>, document.getElementById('root')
  );
  registerServiceWorker();
  