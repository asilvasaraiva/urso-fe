import React from 'react';
import AxiosRequest from '../AxiosRequest';
import retrieveToken from '../useToken';

import MessagesLists from './messageList';

class Messages extends React.Component {
  state = { messages: [], newMsg: 0 };


   fechLista

  async componentDidMount() {
    let authorization = retrieveToken();

    const listMessages = await AxiosRequest.get('/admin/messages/', {headers:{Authorization:authorization}});
    console.log(listMessages);
    let newMsg = listMessages.data.filter(m => m.read === false);
    console.log(newMsg);
    this.setState({ messages: listMessages.data, newMsg: newMsg.length });
  }

  render() {
    if (this.state.messages === []) {
      return <div>Loading...</div>
    }

    return (
      <div ><MessagesLists listOfMessages={this.state.messages} newMessages={this.state.newMsg} /> </div>
    );
  }
}

export default Messages;
