import React, { Component } from 'react';
import './App.css';
import Main from './containers/main';
import { Provider } from 'react-redux';
import { configureStore } from "./store";

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
