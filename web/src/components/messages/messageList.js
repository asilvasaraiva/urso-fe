import React from 'react';


const MessagesLists = (props) => {
    console.log(props)
    const messages = props.listOfMessages.map(msg => {
        return (
            <div className="ui card">
                <div key={msg.id}>
                    <div className="item" >
                        <label>Tipo de mensagem:</label> {msg.typeOf}
                    </div>
                    <div className="item">
                        <label>Status da mensage:</label> {msg.isRead === true ? "Lida" : "Não Lida"}
                        <label>Status da mensage:</label> {msg.isRead === true ?  <i class="circle icon blue"></i> : <i class="circle icon red"></i>}
                       
                    </div>
                    <div className="item">
                        <label>Conteúdo:</label>: {msg.content}
                    </div>
                </div>
            </div>
        );
    });
    return <div>{messages}</div>
}

export default MessagesLists;