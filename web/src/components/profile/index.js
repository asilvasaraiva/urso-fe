import React from 'react';
import AxiosRequest from '../AxiosRequest';
import {retrieveToken, calculaIdade} from '../Utils';
import Spinner from '../Spinner';


class Profile extends React.Component {

  state = { profile: null }

  async componentDidMount() {
    let authorization = retrieveToken();
    const tokenString = JSON.parse(sessionStorage.getItem('token'));
    let userID = tokenString.id;
    const profile = await AxiosRequest.get('/users/' + userID, { headers: { Authorization: authorization } });
    console.log(profile.data)
    this.setState({ profile: profile.data });
  }

  renderedProfile = (myProfile) => {

    var birth = calculaIdade(new Date(myProfile.birth));
    var joinDate = new Date(myProfile.joinDate);
    return (
      <React.Fragment>
        <div class="ui form">
          <div class="ui segment">
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
          <div className="ui center aligned basic segment">
            <div className="ui buttons ">
              <button className="ui button primary">Trocar senha</button>
              <div className="or" data-text="ou"></div>
              <button className="ui negative button"> Desconectar</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }


  render() {

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

export default Profile;
