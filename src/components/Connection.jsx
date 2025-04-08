import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

class Connection extends Component {
    state = { connected: false, ros: null } 
    constructor() {
        super();
        setInterval(() => {
            this.setState(prevState => ({connected: !prevState.connected}))
        }, 1000)
    }
    render() { 
        return (
            <Alert className='text-center m-3' variant={this.state.connected?"success":"danger"}>{this.state.connected?"Connected":"Disconnected"}</Alert>
        );
    }
}

export default Connection;