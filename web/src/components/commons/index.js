import React from 'react';
import { Link } from 'react-router-dom';
import MainContent from './MainContent';

export const Header = () => {
    return (
        <div className="ui secondary pointing menu">

            <Link to="/profile" className="item">
                <h3><i className="address book outline icon"></i> Meu Perfil</h3>
            </Link>

            <div className="right menu">
                <div className="item">
                    <h3>Painel Administrativo</h3>
                </div>
            </div>


            {/* <div className="right menu">
                <div className="item">
                    <i className="home icon"></i>
                    <Link to="/profile">
                    Home
                    </Link> 
                    
                
                <a className="item">
                    <i className="grid layout icon"></i> Browse
                </a>
                <a className="item">
                   
                </a>
            </div>
            </div> */}
        </div>
    );
}

export const SidePanel = () => {
    return (
        <div className="ui one column stackable grid" >
            <div className="column ten  wide">
                <Link to="/messages" className=" ui primary button ">
                    <h3> <i className="mail icon"></i>Mensagens</h3>
                </Link>                
            </div>
            <div className="column ten   wide">
                <Link to="/users" className="ui primary button">
                    <h3> <i className="users icon"></i>Usuários</h3>
                </Link>
            </div>
            <div className="column ten wide">
                <Link to="/reports" className="ui primary button" >

                <h3> <i className="chart line icon"></i>Relatórios</h3>
                </Link>
            </div>

        </div>
    );
}

export const Footer = () => {

    return (
        <div className="ui center menu ">            
            <div className="column position flex" >
                <h3>Your Solution, 2021 -  Todos os Direitos Reservados</h3>
                </div>
        </div>

    );
}