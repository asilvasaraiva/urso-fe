import React from 'react';
import Users from './users';
import Reports from './reports';
import Profile from './profile';
import Messages from './messages';

class App extends React.Component{
  render(){
    return (
      <div>
        <Users />
        <Reports />
        <Profile />
        <Messages />
      </div>
    );
  }
}

export default  App;
