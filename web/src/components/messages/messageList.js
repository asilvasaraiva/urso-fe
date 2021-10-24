import React, { useState, useEffect} from 'react';
import axios from 'axios';


const MessagesLists = (props) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [readMessages, setReadMessages] = useState(props.newMessages);



    useEffect(()=>{
        setReadMessages(props.newMessages);
    },[props.newMessages])

    const onClickAcordion = async (index, msg) => {
        setActiveIndex(index);

        if (!msg.isRead) {
            msg.isRead = true;
            const listMessages = await axios.patch('http://localhost:3001/messages/' + msg.id, msg);  
            if(readMessages>0)   
            var newNumber =  readMessages-1;      
                setReadMessages(newNumber);
        }
    }


    const messages = props.listOfMessages.map((msg, index) => {
        const active = index === activeIndex ? 'active' : '';
        return (
            <React.Fragment key={msg.id}>
                <div className={`title ${active}`} onClick={() => onClickAcordion(index, msg)} >
                    <h3> {msg.typeOf}
                        <span> {msg.typeOf === "sugestion" ? <i className="circle icon blue small"></i> : <i className="circle icon small red"></i>}</span></h3>
                    <p ><label>Status da mensage:</label> <b> {msg.isRead === true ? "Lida" : "Não Lida"}</b></p>
                </div>
                <div className={`content ${active}`}>
                    <p><label>Conteúdo:</label>: {msg.content}</p>
                </div>
            </React.Fragment>
        );
    });

    return (
        <div style={{ marginTop: '20px' }}>
            <div className="ui header">
                <i className="envelope open icon"></i>
                Todas as mensagens ({readMessages} mensagens não lidas)
            </div>
            <div className="ui styled accordion" >{messages}</div>
        </div>
    );
}

export default MessagesLists;