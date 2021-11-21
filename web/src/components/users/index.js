import React, { Link } from 'react';
import AxiosRequest from '../AxiosRequest';
import retrieveToken from '../useToken';

import { Route } from 'react-router-dom';

import UserList from './userList';



class Users extends React.Component {
  
  state = { list: [] };
  
  
  async componentDidMount() {
    let authorization = retrieveToken();
    const listUsers = await AxiosRequest.get('/users/', { headers: { Authorization: authorization } });
    console.log(listUsers.data);
    this.setState({ list: listUsers.data });

  }
  
  updateList = (newList)=> {
   this.setState({ list:newList});
 }

  render() {
    return (
      <div>
        <div className="ui horizontal divider header">
          <i className="users  icon"></i>
          Gerenciar Usuários
        </div>
        <UserList listUsers={this.state.list} updateParentList={this.updateList}/>
      </div>
    );
  }

}

export default Users;

