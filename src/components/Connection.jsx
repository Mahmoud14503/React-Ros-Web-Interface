import React from 'react';
import { Alert } from 'react-bootstrap';
import ROSLIB from 'roslib';

class ConnectionStatus extends React.Component {
    // NOTE: the ros.on function is executed once 
    // SO YOU NEED TO REGRESH EACH TIME YOU START THE SERVER 
    state = { connected: false, ros: null };

    componentDidMount() {
        this.rosConnection();
    }

    rosConnection() {
            this.state.ros = new ROSLIB.Ros({ url: 'ws://localhost:9090' });
            
            this.state.ros.on('connection', () => {
                this.setState({connected: true})
                console.log('connected successfully to the websocket');
            });
    
            this.state.ros.on('error', (error) => {
                this.setState({connected: false})
                console.log(`errored out: ${error}`);
            });
    
            // When the Rosbridge server shuts down, fill the "status" span with "closed"
            this.state.ros.on('close', () => {
                this.setState({connected: false})
                console.log('connection closed');
            });
        }

    render() {
        return (
            <Alert className='text-center m-3' variant={this.state.connected ? "success" : "danger"}>
                {this.state.connected ? "Connected" : "Disconnected"}
            </Alert>
        );
    }
}

export default ConnectionStatus;
