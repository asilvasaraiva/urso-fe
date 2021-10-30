import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Users from './users';
import Reports from './reports';
import Profile from './profile';
import Messages from './messages';
import { Header, Footer,SidePanel } from './commons/';
import MainContent from './commons/MainContent';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <SidePanel />
            {/* <Route path="/" /> */}
            <Route path="/messages" exact component={Messages} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/users" exact component={Users} />
          </div>
        </BrowserRouter>       
        {/* <div className="ui container" style={{ alignItems: 'center' }} >
          <Users />
          <Messages/>
        </div> */}


      </div>
    );
  }
}

export default App;
