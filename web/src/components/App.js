import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Users from './users';
import Reports from './reports';
import Profile from './profile';
import Messages from './messages';
import Login from './login/Login';
import { getRawToken } from './Utils';

import { Header, Footer, SidePanel } from './commons';
import ForgotPassword from './ForgotPassword/ForgotPassword';




function App() {

  const [token, setToken] = useState();
  const [ forgot,setForgot] =useState()

  console.log("func Raw Token")
  console.log(getRawToken());

  let authorized;


  if (!getRawToken()) {
    authorized = false;
  } else {
    authorized = true;
  }

  if(!authorized && !forgot){
    return <Login setToken={setToken} setForgot={setForgot} />;
  }

  if(!authorized && forgot){
    return <ForgotPassword setForgot={setForgot}/>
  }

  return (
    <div>      
      <div>
        <Header />
        <div className="ui two column centered grid" style={{ marginTop: '20px' }}>

          <div className="ui row">
            <div className="four wide column">
              <SidePanel />
            </div>
            <div className="twelve wide column" style={{ paddingRight: '100px' }}>
              <div className="ui raised segment general-background">
                <Switch>
                  <Route path="/users" exact component={() => < Users isLogged={authorized} />} />
                  <Route path="/messages" exact component={() => <Messages isLogged={authorized} />} />
                  <Route path="/" exact component={() => <Profile isLogged={authorized} />} />
                  {/* <Route path="/profile" exact component={() => <Profile isLogged={authorized}/>} /> */}
                  <Route path="/reports" exact component={() => <Reports isLogged={authorized} />} />               
                  <Redirect to="/" />
                </Switch>
              </div>
            </div>
            <Footer />
          </div>

        </div>
      </div>
      
    </div>
  );
  //TODO - tratar erro de conexão no server

}

export default App;
