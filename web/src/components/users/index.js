import React, { Link } from 'react';
import { Redirect,withRouter  } from 'react-router-dom';

import AxiosRequest from '../AxiosRequest';
import {retrieveToken} from '../Utils';

import UserList from './userList';



class Users extends React.Component {
  
  state = { list: [] };
  
  
  async componentDidMount() {
    let authorization = retrieveToken();
    if(!authorization){
      return <Redirect to="/login"/>;
    }else{
      const listUsers = await AxiosRequest.get('/users/', { headers: { Authorization: authorization } });
      console.log(listUsers.data);
      this.setState({ list: listUsers.data });
    }
  }
  
  updateList = (newList)=> {
   this.setState({ list:newList});
 }

  render() {
    
    if(!this.props.isLogged){    
      return <Redirect to="/login"/>
    }
    return (
      <div>
        <div className="ui horizontal divider header">
          <i className="users  icon"></i>
          Gerenciar Usuários
        </div>
        <UserList 
        listUsers={this.state.list} 
        updateParentList={this.updateList}
        isLogged={this.props.isLogged}
         myToken={this.props.myToken} />
      </div>
    );
  }

}

export default Users;

