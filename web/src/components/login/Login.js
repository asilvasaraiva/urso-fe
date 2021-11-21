import React, { useState } from 'react';
import axios from 'axios';

import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/api/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => {
            if(data.status==200){
                return data.json();
            }else 
               return null;
            }
            
        )
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });

        if(token!== null && token.roles[0]==="ADMIN"){
            sessionStorage.setItem('token', JSON.stringify(token));
            setToken(token);
        }else{
            alert("Usuário não é admin")
        }
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}