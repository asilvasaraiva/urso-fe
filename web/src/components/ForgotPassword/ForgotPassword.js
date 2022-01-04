import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AxiosRequest from '../AxiosRequest';


export default function ForgotPassword({ setForgot }) {
    let history = useHistory();
    const [erroActive, setErroActive] = useState(false);
    const [sucess, setSucess] = useState(false);

    let Email = '';

    const handleSubmit = async e => {
        e.preventDefault();
        const resetdPasswd = await AxiosRequest.post('/auth/resetpassword', { email: Email })
            .then(res => {
                console.log(res.data)
                if (res.data.statusCodeValue === 'OK')
                alert("foi")
                setSucess(true);
            })
            .catch(error => {                
                setErroActive(true)
            });
    }

    function changePermission() {
        setSucess(false);
        setErroActive(false);        
    }

    function headBack() {
        history.push("/login");
        setForgot(false);
    }

    return (
        <div id="loginform">

            <h3 id="headerTitle"> <i className="arrow left icon forgot-senha" onClick={() => headBack()} ></i>Esqueci minha Senha!
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="row ">
                    <label className='label-forgot-senha'>
                        Informe o email cadastrado :
                    </label>
                    <input
                        type="text"
                        onChange={e => Email = e.target.value}
                        placeholder="email@email.com"                        
                        onFocus={() => changePermission()}
                    />
                </div>
                <div id="button" className="row" >
                    <button type="submit" >Solicitar Nova senha</button>
                    {erroActive && <div className="validation"><p>Erro no email </p></div>}
                    {sucess && <div className="validation sucess"><p>Senha enviada com sucesso </p></div>}

                </div>
            </form>

        </div>
    )

}

