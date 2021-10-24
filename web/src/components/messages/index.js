import React from 'react';
import axios from 'axios';

import MessagesLists from './messageList';

class Messages extends React.Component{
  state = {messages:[], newMsg:0};


fechLista

async componentDidMount(){
   const listMessages = await axios.get('http://localhost:3001/messages');
   let newMsg = listMessages.data.filter(m=> m.isRead===false); 
    this.setState({messages:listMessages.data,newMsg:newMsg.length});       
  }

  render(){
    if(this.state.messages ===[]){
      return <div>Loading...</div>
    }

    return (
    <div ><MessagesLists listOfMessages={this.state.messages} newMessages={this.state.newMsg}/> </div>    
    );
  }
}

export default Messages;
