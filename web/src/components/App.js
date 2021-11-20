import React,{useState} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Users from './users';
import Reports from './reports';
import Profile from './profile';
import Messages from './messages';
import { Header, Footer, SidePanel } from './commons/';
import Login from './login/Login';



function App() {

  const  [token, setToken] = useState();

 
  if(!token) {
    return <Login setToken={setToken} />
  }
 

  //Adicionar um arquivo para ser a API_ROUTE
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="ui two column centered grid" style={{marginTop:'100px'}}>
              <div className="ui row">
                <div className="four wide column">
                <SidePanel />
                </div>
                <div className="twelve wide column" style={{paddingRight:'200px'}}>
                <div className="ui raised segment">
                  <div>
                  <Route path="/users" exact component={Users} />
                  <Route path="/messages" exact component={Messages} />
                  <Route path="/" exact component={Profile} />
                  <Route path="/profile" exact component={Profile} />
                  <Route path="/reports" exact component={Reports} />
                  </div>
                </div>
                </div>
              </div>
            </div>

          </div>
          <Footer />
        </BrowserRouter>
        {/* <div className="ui container" style={{ alignItems: 'center' }} >
          <Users />
          <Messages/>
        </div> */}


      </div >
    );
  
}

export default App;
