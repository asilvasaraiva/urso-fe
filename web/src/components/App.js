import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Users from './users';
import Reports from './reports';
import Profile from './profile';
import Messages from './messages';
import Home from './Home';
import Login from './login/Login';
import {getRawToken} from './Utils';




function App() {

  const [token, setToken] = useState();

console.log("func Raw Token")
 console.log(getRawToken());

  let authorized;


  if (!getRawToken()) {
    authorized = false;
    // alert("Não logado")
    // console.log(token)
  } else {
    // alert('Logado')
    // console.log(token);
    authorized = true;
  }

  return (
    <div>
      {authorized && <Home />}
      <Switch>
        <Route path="/users" exact component={() => < Users isLogged={authorized} />} />
        <Route path="/messages" exact component={() => <Messages isLogged={authorized} />} />
        <Route path="/" exact component={() => <Profile isLogged={authorized} />} />
        {/* <Route path="/profile" exact component={() => <Profile isLogged={authorized}/>} /> */}
        <Route path="/reports" exact component={() => <Reports isLogged={authorized} />} />
        <Route path="/login" exact component={() => <Login setToken={setToken} />} />
        <Redirect to="/login"/>   
      </Switch>
    </div>
  );
//TODO - SE A PESSOA DIGITAR UMA ROTA ALEATORIA AUTENTICADO ELE EXIBE UM LOGIN DENTRO DO MENU
}

export default App;
