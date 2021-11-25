import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AxiosRequest from '../AxiosRequest';
import Spinner from '../Spinner';


import './Login.scss';

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
            } else {
                console.log("Falha de conexão com o servidor, tente novamente em instantes");
                setErroConexao(true);
            }
        });
}


export default function Login({ setToken }) {
     let history = useHistory(); 
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [erroActive, setErroActive] = useState(false);
    const [erroConexao, setErroConexao] = useState(false)
    const [spinActive, setSpinActive] = useState(false)
    const [isNotAdmin, setIsNotAdmin] = useState(false);




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

   

    return ( //FORM NOVO
        <div id="loginform">
            <h3 id="headerTitle">   Bem Vindo!!     
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label>
                        E-mail:
                    </label>
                    {/* <div className={`validation ${erroActive ? 'error' : ''}`}> */}
                        <input
                            type="text"
                            onChange={e => setUserName(e.target.value)}
                            placeholder="digite o email"
                            onFocus={() => changePermission()} />
                    {/* </div> */}
                </div>
                <div className="row label-login inline">
                    <label className="senha">
                        Senha:
                    </label>
                    {/* <div className={`validation ${erroActive ? 'error' : ''}`}> */}
                        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="digite a senha" />
                    {/* </div> */}
                    <label className="esqueceu-senha " style={{  textAlign:'right' }}>Esqueceu a senha?</label>
                </div>
                <div id="button" className="row" >
                    <button type="submit" >Login</button>
                    {erroActive && <div className="validation"><p>Credenciais inválidas</p></div>}
                    {isNotAdmin && <div  className="validation"><p>Conta informada não é um adminstrador</p></div>}
                    {erroConexao && <div  className="validation"><p>Falha de conexão com o servidor, tente novamente em instantes</p></div>}
                </div>
            </form>

            <div className="ui horizontal divider">
                Ou
            </div>
            <div className="ui center aligned basic segment">
                <button className="ui circular facebook button">
                    <i className="facebook icon"></i>
                    Facebook
                </button>
                <button className="ui circular google negative button">
                    <i className="google  icon"></i>
                    Google
                </button>
            </div>
        </div>
    )

    // return ( FORM QUE FUNCIONA
    //     <div className="ui one column stackable centered page grid">
    //         <div className="column five wide">
    //             <div className="ui form">
    //                 <h1>Bem Vindo!!</h1>
    //                 <p>Por favor informe seus dados</p>
    //                 <form onSubmit={handleSubmit}>
    //                     <div >
    //                         <label>
    //                             Endereço de email:
    //                         </label>
    //                         <div className={`field ${erroActive ? 'error' : ''}`}>
    //                             <input
    //                                 type="text"
    //                                 onChange={e => setUserName(e.target.value)}
    //                                 placeholder="examplo@exemplo"
    //                                 onFocus={() => changePermission()} />
    //                         </div>
    //                         <label>
    //                             Senha
    //                             <div className={`field ${erroActive ? 'error' : ''}`}>
    //                                 <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Senha" />
    //                             </div>
    //                         </label>
    //                         {erroActive && <div><p>Usuário ou senha inválidos</p></div>}
    //                         {isAdmin && <div><p>Conta informada não é um adminstrador</p></div>}
    //                         {erroConexao && <div><p>Falha de conexão com o servidor, tente novamente em instantes</p></div>}
    //                     </div>
    //                     <div className="ui center aligned basic segment">
    //                         <button className="ui button primary" type="submit">Login</button>
    //                     </div>
    //                 </form>

    //                 <div class="ui horizontal divider">
    //                     Ou
    //                 </div>
    //                 <div className="ui center aligned basic segment">
    //                     <button class="ui circular facebook button">
    //                         <i class="facebook icon"></i>
    //                         Facebook
    //                     </button>
    //                     <button class="ui circular google negative button">
    //                         <i class="google  icon"></i>
    //                         Google
    //                     </button>
    //                 </div>

    //             </div>
    //         </div>
    //     </div>
    // )


}

