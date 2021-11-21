import React, { useState } from 'react';
import AxiosRequest from '../AxiosRequest';
import Spinner from '../Spinner';

import './Login.css';

async function loginUser(credentials, setMsgError) {
    return AxiosRequest.post('/auth/login/', JSON.stringify(credentials), {
        headers: {
            'Content-Type': 'application/json'
        },       
    })
        .then(res => res.data)
        .catch(error =>{
            console.log(error);
         });    

}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [msgError, setMsgError] = useState('');
    const [spinActive, setSpinActive] = useState(false)


    const handleSubmit = async e => {
        e.preventDefault();
        setSpinActive(true);
        const token = await loginUser({
            username,
            password
        }, setMsgError);
        setSpinActive(false);

        if (token !== undefined) {
            if (token.roles[0] === "ADMIN") {
                sessionStorage.setItem('token', JSON.stringify(token));
                setToken(token);
            } else {
                alert("Usuário não é admin")
            }
        }
    }

    if (spinActive) {
        return <Spinner />;
    }

    return (
        <div className="ui one column stackable center aligned page grid">
            <div className="column six wide">

                <div className="ui form">
                    <h1>Bem Vindo!!</h1>
                    <p>Por favor informe seus dados</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Endereço de email:
                        </label>
                        <input type="text" onChange={e => setUserName(e.target.value)} placeholder="examplo@exemplo" />

                        <label>
                            <p>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                        </label>
                        <div>                        
                            <button className="ui button primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )


}

