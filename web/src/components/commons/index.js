import React from 'react';
import { Link } from 'react-router-dom';


export const Header = () => {
    return (
        <div className='ui horizontal divider aligned general-title'>
            Administração
        </div>
    );
}

export const SidePanel = () => {
    return (
        <div className='ui segment center aligned general-background ajusteColuna'>
            <div className="ui vertical buttons" >
                <button  className="myButon" >
                    <Link to="/">
                        <h3><i className="address book outline icon"></i> Meu Perfil</h3>
                    </Link>
                </button>
                <button  className="myButon">
                    <Link to="/messages" >
                        <h3> <i className="mail icon"></i>Mensagens</h3>
                    </Link>
                </button>
                <button  className="myButon">
                    <Link to="/users" >
                        <h3> <i className="users icon"></i>Usuários</h3>
                    </Link>
                </button>
                <button  className="myButon">
                    <Link to="/reports" >
                        <h3> <i className="chart line icon"></i>Relatórios</h3>
                    </Link>
                </button>

            </div>
        </div>
    );
}

export const Footer = () => {

    return (
        <div className="footer">
            <div className="ui center aligned segment">
                <div className="column" >
                    <h3>Your Solution, 2021 -  Todos os Direitos Reservados</h3>
                </div>
            </div>
        </div>

    );
}