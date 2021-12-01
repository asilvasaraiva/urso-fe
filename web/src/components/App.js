import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Users from './users';
import Reports from './reports';
import Profile from './profile';
import Messages from './messages';
import Home from './Home';
import Login from './login/Login';
import { getRawToken } from './Utils';

import { Header, Footer, SidePanel } from './commons';




function App() {

  const [token, setToken] = useState();

  console.log("func Raw Token")
  console.log(getRawToken());

  let authorized;


  if (!getRawToken()) {
    authorized = false;
  } else {
    authorized = true;
  }

  if(!authorized){
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      {/* <Home> */}
      <div>
        <Header />
        <div className="ui two column centered grid" style={{ marginTop: '100px' }}>

          <div className="ui row">
            <div className="four wide column">
              <SidePanel />
            </div>
            <div className="twelve wide column" style={{ paddingRight: '200px' }}>
              <div className="ui raised segment">
                <Switch>
                  <Route path="/users" exact component={() => < Users isLogged={authorized} />} />
                  <Route path="/messages" exact component={() => <Messages isLogged={authorized} />} />
                  <Route path="/" exact component={() => <Profile isLogged={authorized} />} />
                  {/* <Route path="/profile" exact component={() => <Profile isLogged={authorized}/>} /> */}
                  <Route path="/reports" exact component={() => <Reports isLogged={authorized} />} />
                  {/* <Route path="/login" exact component={() => <Login setToken={setToken} />} /> */}
                  <Redirect to="/" />
                </Switch>
              </div>
            </div>
            <Footer />
          </div>

        </div>
      </div>
      {/* </Home> */}
    </div>
  );
  //TODO - tratar erro de conexão no server

}

export default App;
