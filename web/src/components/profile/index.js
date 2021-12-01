import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import AxiosRequest from '../AxiosRequest';
import { retrieveToken, calculaIdade } from '../Utils';
import Spinner from '../Spinner';


class Profile extends React.Component {


  state = { profile: null }

  LOG_OUT = false;


  async componentDidMount() {

    var authorization = retrieveToken();

    console.log(authorization);
    if (!authorization) {
      window.location.reload();
    } else {
      const tokenString = JSON.parse(sessionStorage.getItem('token'));
      let userID = tokenString.id;
      const profile = await AxiosRequest.get('/users/' + userID, { headers: { Authorization: authorization } });
      console.log(profile.data)
      this.setState({ profile: profile.data });
    }
  }

  logOut = () => {
    alert("Desconectado com sucesso");
    sessionStorage.removeItem('token');
    window.location.reload();
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
          <div className="ui center aligned segment">
            <div className="one column" >

              {/* <div className="ui buttons "> */}
              <button className="ui circular button primary">Trocar senha</button>
              <button className="ui circular negative button" onClick={() => this.logOut()}> Desconectar</button>
              {/* </div> */}
            </div>
          </div>
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
