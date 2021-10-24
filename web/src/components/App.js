import React from 'react';

import Users from './users';
import Reports from './reports';
import Profile from './profile';
import Messages from './messages';
import { Header, Footer } from './commons/';
import MainContent from './commons/MainContent';

class App extends React.Component {
  render() {
    return (

      <div>
        <div className="ui attached stackable menu">
          <div className="ui container">
            <a className="item">
              <i className="home icon"></i> Home
            </a>
            <a className="item">
              <i className="grid layout icon"></i> Browse
            </a>
            <a className="item">
              <i className="mail icon"></i> Messages
            </a>
          </div>
        </div>
        <div className="ui containner">
         <Messages/>
        </div>
      </div>




    );
  }
}

export default App;
