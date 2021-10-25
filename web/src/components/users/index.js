import React from 'react';
import axios from 'axios';

import UserList from './userList';


class Users extends React.Component {

  state={list:[]}

  async componentDidMount() {

    const listUsers = await axios.get('http://localhost:8080/api/users/');
    console.log(listUsers.data);
    this.setState({list:listUsers.data});

  }


  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <div className="ui header">
          <i className="users  icon"></i>
          Gerenciar Usuários 
        </div>
        <UserList listUsers={this.state.list}  />
      </div>
    );
  }

}

export default Users;

