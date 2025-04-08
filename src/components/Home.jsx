import React, { Component } from 'react';
import Connection from './Connection';
import Map from './Map';
import RobotState from './RobotState';

class Home extends Component {
    state = { };

    render() { 
        return (
            <div>
                <Connection />
                <Map />
                <RobotState />
            </div>
        );
    }
}

export default Home;