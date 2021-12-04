import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import AxiosRequest from '../AxiosRequest';
import { retrieveToken, calculaIdade } from '../Utils';
import Spinner from '../Spinner';


class Profile extends React.Component {


  state = { profile: null, Authorization:null}

  LOG_OUT = false;
  
  


  componentDidMount() {

    var authorization = retrieveToken();

    console.log(authorization);
    if (!authorization) {
      this.setState({Authorization:null})
      window.location.reload();
    } else {
      this.setState({Authorization:authorization})
      this.getProfile(authorization);
    }
  }



  getProfile = async (authorization) => {
    const tokenString = JSON.parse(sessionStorage.getItem('token'));
    let userID = tokenString.id;
    const profile = await AxiosRequest.get('/users/' + userID, { headers: { Authorization: authorization } });
    console.log(profile.data)
    this.setState({ profile: profile.data });

  }

  logOut = () => {
    sessionStorage.removeItem('token');
    alert("Desconectado com sucesso");
    window.location.reload();
  }


  changePasswd = () => {
    var passwrd='', pswd = '';

    return (
      <div className="sidebar">
        <div className="pusher">
          <div className="ui small form "   >
            <div className="two fields">
              <div className="field">
                <label>Nova senha</label>
                <input placeholder="digite a senha" 
                type="text" 
                onChange={e => this.passwrd = e.target.value}
                />
              </div>
              <div className="field">
                <label>Confirme a senha</label>
                <input placeholder="confirme a senha"  
                type="text" 
                onChange={e => this.pswd = e.target.value}
                />
              </div>
            </div>
            <div className="ui submit button right " onClick={(e) => this.submitPassrd(e,this.passwrd,this.pswd)}>Enviar</div>
          </div>
        </div>
      </div>
    )

  }

  submitPassrd = async (e, password,pswd) => {
    e.preventDefault();

    if(password === pswd){
      const tokenString = JSON.parse(sessionStorage.getItem('token'));
    let userID = tokenString.id;
    alert(userID);
    const profile = await AxiosRequest.put(`/users/${userID}/newpassword`,{password:pswd}, { headers: { Authorization: this.state.Authorization } });  
    console.log(profile);  
    }else{
      alert("passwrd diferentes");      
    }
   
  }


  renderedProfile = (myProfile) => {

    var birth = calculaIdade(new Date(myProfile.birth));
    var joinDate = new Date(myProfile.joinDate);
    return (
      <React.Fragment>
        <div className="ui form">
          <div className="ui segment">
            <h3>
              <div className="inline fields">
                <div className="nine wide field">
                  <label>Nome Completo:</label>
                  <label>{myProfile.name + myProfile.surname} </label>
                </div>
                <div className="seven wide field">
                  <label>Email:</label>
                  <label>{myProfile.email} </label>
                </div>
              </div>
              <div className="inline fields">
                <div className="nine wide field">
                  <label>Idade: </label>
                  <label>{birth} anos </label>
                </div>
                <div className="seven wide field">
                  <label>Membro desde:</label>
                  <label>{joinDate.toLocaleDateString()} </label>
                </div>
              </div>
            </h3>
          </div>
          <div className="ui  segment">
            <div className="two column" >
              <div className="column">

              <label className="ui header " >Trocar senha

              </label>
              </div>
              {this.changePasswd()}
            </div>
          </div>
              <button className="fluid ui circular negative button" onClick={() => this.logOut()}> Desconectar</button>
        </div>
      </React.Fragment>
    );

  }


  render() {


    if (!this.props.isLogged) {
      return <Redirect to="/login" />
    }

    if (this.state.profile === null) {
      return <Spinner />
    }


    return (
      <div>
        <div className="ui horizontal divider header">
          <i className="address book outline icon"></i>
          Meu Perfil
        </div>
        <div>
          {this.renderedProfile(this.state.profile)}
        </div>

      </div>

    )
  }
}

export default withRouter(Profile);
