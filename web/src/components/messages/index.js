import React from 'react';
import axios from 'axios';

import MessagesLists from './messageList';

class Messages extends React.Component{
  state = {messages:[]};


fechLista

async componentDidMount(){
   const listMessages = await axios.get('http://localhost:3001/messages');
    this.setState({messages:listMessages.data});    
  }

  render(){
    if(this.state.messages ==[]){
      return <div>Loading...</div>
    }

    return (
    <div style={{marginLeft:"50px", marginTop:"20px"}}><MessagesLists listOfMessages={this.state.messages}/> </div>    
    );
  }
}

export default Messages;
