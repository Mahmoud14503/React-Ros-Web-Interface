import React, { Component } from "react";
import { Joystick } from 'react-joystick-component';
import ROSLIB from "roslib";

class JoyStick extends Component {
  state = { ros : null };
  constructor() {
    super();
    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.rosConnection();
  }
  rosConnection() {
          this.state.ros = new ROSLIB.Ros({ url: 'ws://localhost:9090' });
  
          this.state.ros.on('connection', () => {
              console.log('connected successfully');
          });
  
          this.state.ros.on('error', (error) => {
              console.log(`errored out: ${error}`);
          });
  
          this.state.ros.on('close', () => {
              console.log('connection closed');
          });
      }

  
  handleMove(event) {
    console.log("mooooving")
    const cmd_vel_listener = new ROSLIB.Topic({
        ros: this.state.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/msg/Twist',
    });
    const twistMessage = new ROSLIB.Message({
      linear: {
        x: event.y + 2.5 ,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: - event.x ,
      },
    });
    console.log(twistMessage);
    cmd_vel_listener.publish(twistMessage);
  }


  handleStop(event) {
    console.log("stoooop anhalte")
    const cmd_vel_listener = new ROSLIB.Topic({
        ros: this.state.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/msg/Twist',
    });
    const twistMessage = new ROSLIB.Message({
      linear: {
        x: 0,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    });
    console.log(twistMessage);
    cmd_vel_listener.publish(twistMessage);
  }

  render() {
    return (
      <Joystick size={100} sticky={false} baseColor="grey" stickColor="red" move={this.handleMove} stop={this.handleStop}></Joystick>
    )
  }
}
export default JoyStick;