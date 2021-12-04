import React from 'react';
import SockJsClient from 'react-stomp';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      messages: []
    }
  }


  sendMessage = (msg) => {
    this.clientRef.sendMessage('/topics/all', msg);
  }

  render() {
    return (
      <div>
        <div>
        <input value={this.state.value} onChange={e => {this.setState({value: e.target.value})}}/>
        <button onClick={() => {this.sendMessage(this.state.value)}}>send</button>
        </div>
        <div>
          <pre>{JSON.stringify(this.state.messages)}</pre>
        </div>
        <SockJsClient url='https://react-websocket.herokuapp.com/handler' topics={['/topics/all']}
            onMessage={(msg) => { this.setState({messages: [...this.state.messages, msg]}); console.log(msg); }}
            ref={ (client) => { this.clientRef = client }} />
      </div>
    );
  }
}