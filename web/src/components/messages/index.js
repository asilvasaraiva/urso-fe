import React from 'react';
import AxiosRequest from '../AxiosRequest';
import {retrieveToken} from '../Utils';
import MessagesLists from './messageList';
import Spinner from '../Spinner';

class Messages extends React.Component {
  state = { messages: [], newMsg: 0 };


   fechLista

  async componentDidMount() {
    let authorization = retrieveToken();

    const listMessages = await AxiosRequest.get('/admin/messages/', {headers:{Authorization:authorization}});
    // console.log(listMessages);
    let newMsg = listMessages.data.filter(m => m.read === false);
    // console.log(newMsg);
    this.setState({ messages: listMessages.data, newMsg: newMsg.length });
  }

  render() {
    if (this.state.messages === []) {
      return <Spinner />
    }

    return (
      <div ><MessagesLists listOfMessages={this.state.messages} newMessages={this.state.newMsg} /> </div>
    );
  }
}

export default Messages;
