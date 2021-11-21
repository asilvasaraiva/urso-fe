import React, { useState } from 'react';
import AxiosRequest from '../AxiosRequest';
import Spinner from '../Spinner';

import './Login.css';

async function loginUser(credentials, setErroActive, setErroConexao) {
    return AxiosRequest.post('/auth/login/', JSON.stringify(credentials), {
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
            }else{
                console.log("Falha de conexão com o servidor, tente novamente em instantes");
                setErroConexao(true);
            }
        });
}


export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [erroActive, setErroActive] = useState(false);
    const [erroConexao, setErroConexao] = useState(false)
    const [spinActive, setSpinActive] = useState(false)
    const [isAdmin, setIsNotAdmin] = useState(false);




    const handleSubmit = async e => {
        e.preventDefault();
        setSpinActive(true);
        const token = await loginUser({
            username,
            password
        }, setErroActive, setErroConexao);
        setSpinActive(false);

        if (token !== undefined) {
            if (token.roles[0] === "ADMIN") {
                sessionStorage.setItem('token', JSON.stringify(token));
                setToken(token);
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
    return (
        <div className="ui one column stackable center aligned page grid">
            <div className="column six wide">

                <div className="ui form">
                    <h1>Bem Vindo!!</h1>
                    <p>Por favor informe seus dados</p>
                    <form onSubmit={handleSubmit}>
                        <div>

                            <label>
                                Endereço de email:
                            </label>
                            <div className={`field ${erroActive ? 'error' : ''}`}>
                                <input
                                    type="text"
                                    onChange={e => setUserName(e.target.value)}
                                    placeholder="examplo@exemplo"
                                    onFocus={() => changePermission()} />
                            </div>
                            <label>
                                Password
                                <div className={`field ${erroActive ? 'error' : ''}`}>
                                    <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                                </div>
                            </label>
                            {erroActive && <div><p>Usuário ou senha inválidos</p></div>}
                            {isAdmin && <div><p>Conta informada não é um adminstrador</p></div>}
                            {erroConexao && <div><p>Falha de conexão com o servidor, tente novamente em instantes</p></div>}
                        </div>
                        <button className="ui button primary" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )


}

