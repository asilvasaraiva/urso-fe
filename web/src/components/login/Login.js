import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AxiosRequest from '../AxiosRequest';
import Spinner from '../Spinner';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import './Login.scss';

const URL_AUTH_SPRING = '/auth/login/';
const URL_OAUTH2 = '/oauth2/authenticate';


async function loginUser(credentials, setErroActive, setErroConexao, path) {
    return AxiosRequest.post(path, JSON.stringify(credentials), {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.data)
        .catch(error => {
            if (error !== null) {
                let status = error.status;
                if (status === 401) {
                    console.log("usuário ou senha inválido");
                    setErroActive(true);
                }
            } else {
                console.log("Falha de conexão com o servidor, tente novamente em instantes");
                setErroConexao(true);
            }
        });
}


export default function Login({ setToken, setForgot }) {
    let history = useHistory();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [erroActive, setErroActive] = useState(false);
    const [erroConexao, setErroConexao] = useState(false)
    const [spinActive, setSpinActive] = useState(false)
    const [isNotAdmin, setIsNotAdmin] = useState(false);



    const responseFacebook = async (response) => {
        console.log(response);
        let name = response.name.split(" ")
        let oauthRequest = {
            "username": response.email,
            "provider": response.graphDomain,
            "name": name[0],
            "surname": name[1],
            "idProvider": response.userID
        }
        const token = await loginUser(oauthRequest, setErroActive, setErroConexao, URL_OAUTH2); 
        validateTokent(token);
    }

    const responseGoogle = async (response) => {
        var profile = response.profileObj;
        let oauthRequest = {
            "username": profile.email,
            "provider": "google",
            "name": profile.givenName,
            "surname": profile.familyName,
            "idProvider": profile.googleId
        }
        const token = await loginUser(oauthRequest, setErroActive, setErroConexao, URL_OAUTH2);        
        validateTokent(token);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setSpinActive(true);
        const token = await loginUser({
            username,
            password
        }, setErroActive, setErroConexao, URL_AUTH_SPRING);
        setSpinActive(false);
        validateTokent(token);
        
    }

    const validateTokent = (token)=>{
        if (token !== undefined) {
            if (token.roles[0] === "ADMIN") {
                sessionStorage.setItem('token', JSON.stringify(token));
                setToken(token);
                history.push("/");
            } else {
                console.log("Usuário não é admin")
                setIsNotAdmin(true);
            }
        }
    }


    if (spinActive) {
        return <Spinner />;
    }

    function changePermission() {
        setIsNotAdmin(false);
        setErroActive(false);
        setErroConexao(false);
    }

    function teste() {
        history.push("/forgot");
        setForgot(true);
    }

    return ( //FORM NOVO
        <div id="loginform">
            <h3 id="headerTitle">   Bem Vindo!!
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label>
                        Meu email:
                    </label>
                    {/* <div className={`validation ${erroActive ? 'error' : ''}`}> */}
                    <input
                        type="text"
                        onChange={e => setUserName(e.target.value)}
                        placeholder="email@email.com"
                        onFocus={() => changePermission()} />
                    {/* </div> */}
                </div>
                <div className="row label-login inline">
                    <label className="senha">
                        Minha senha:
                    </label>
                    {/* <div className={`validation ${erroActive ? 'error' : ''}`}> */}
                    <input type="password" onChange={e => setPassword(e.target.value)} placeholder="****" />
                    {/* </div> */}
                    <label className="esqueceu-senha forgot-senha" onClick={() => teste()}>Esqueceu a senha?</label>
                </div>
                <div id="button" className="row" >
                    <button type="submit" >Login</button>
                    {erroActive && <div className="validation"><p>Credenciais inválidas</p></div>}
                    {isNotAdmin && <div className="validation"><p>Conta informada não é um adminstrador</p></div>}
                    {erroConexao && <div className="validation"><p>Falha de conexão com o servidor, tente novamente em instantes</p></div>}
                </div>
            </form>

            <div className="ui horizontal divider">
                Ou
            </div>
            <div className="ui center aligned basic segment">                
                <FacebookLogin
                    appId={process.env.REACT_APP_ID_FACEBOOK}
                    autoLoad={false}
                    callback={responseFacebook}
                    fields="name,email"
                    cssClass="ui circular facebook  button"
                    icon="fa-facebook"
                    textButton="  Facebook"                    
                />

                <GoogleLogin
                    clientId={process.env.REACT_APP_ID_GOOGLE}
                    buttonText="Login"
                    render={renderProps => (
                        <button className="ui circular google negative button"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>
                            <i className="google  icon"></i>
                            Google
                        </button>
                    )}                    
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    )

}

