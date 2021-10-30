import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            
            <Link to="/profile" className="item">
                <h3><i className="user icon"></i> Meu Perfil</h3>
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

export const SidePanel=()=>{
    return (
        <div class="ui one column stackable page grid" style={{ marginTop: '40px' }}>
                <div class="column twelve wide">
                    <h3> <i className="mail icon"></i>Mensagens</h3>
                </div>
                <div class="column twelve wide">
                <h3> <i className="user icon"></i>Usuários</h3>
                </div>
                <div class="column twelve wide">
                <h3> <i className="chart line icon"></i>Relatórios</h3>
                </div>
                
            </div>
    );
}

export const Footer = () => {

    return <div><h3>Footer</h3></div>;
}