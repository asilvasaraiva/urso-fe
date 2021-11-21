import React from 'react';
import AxiosRequest from '../AxiosRequest';
import retrieveToken from '../useToken';
import Spinner from '../Spinner';

class Profile extends React.Component {

  state = { profile: null }

  async componentDidMount() {
    let authorization = retrieveToken();
    const tokenString = JSON.parse(sessionStorage.getItem('token'));
    let userID = tokenString.id;
    const profile = await AxiosRequest.get('/users/' + userID, { headers: { Authorization: authorization } });
    this.setState({ profile: profile.data });
  }

  renderedProfile = (myProfile) => {
    var age = new Date(myProfile.birth);
    var joinDate = new Date(myProfile.joinDate);

    return (
      <React.Fragment key={myProfile.id}>
        <div key={myProfile.id}>
          <p> Nome: {myProfile.name}</p>
          <p>  Sobrenome:{myProfile.surname}</p>
          <p> E-mail:{myProfile.email}</p>
          <p>Idade:{age.toDateString()} </p>
          Desde:  {joinDate.toLocaleDateString()}
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
