import React, { Component } from 'react';
import Connection from './Connection';
import Map from './Map';
import RobotState from './RobotState';
import JoyStick from './JoyStick';
import StartButton from './StartButton';

class Home extends Component {
    state = { };

    render() { 
        return (
            <div>
                <Connection />
                <Map />
                <RobotState />
                <JoyStick />
            </div>
        );
    }
}

export default Home;