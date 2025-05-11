import React, { Component } from 'react';
import {Row, Col, Container} from 'react-bootstrap'
import * as ROSLIB from 'roslib';
import * as Three from "three";

class RobotState extends Component {
    state = { ros: null, x: 0, y:0, orientation:0, linear_velocity:0, angular_velocity:0, linear_acceleration:0 } 

    componentDidMount() {
        this.rosConnection();
        this.getRobotStates();
    }
    rosConnection() {
        this.state.ros = new ROSLIB.Ros({ url: 'ws://localhost:9090' });
        
        this.state.ros.on('connection', () => {
            // setConnectionStatus('successful');
            // setConnection(true);
            console.log('connected successfully');
        });

        this.state.ros.on('error', (error) => {
            // setConnectionStatus(`errored out (${error})`);
            console.log(`errored out: ${error}`);
        });

        // When the Rosbridge server shuts down, fill the "status" span with "closed"
        this.state.ros.on('close', () => {
            // setConnectionStatus('closed');
            console.log('connection closed');
        });
    }

    getRobotStates() {
        const imu_listener = new ROSLIB.Topic({
            ros: this.state.ros,
            name: '/imu',
            messageType: 'sensor_msgs/msg/Imu',
        });
        const odometry_filtered_global_listener = new ROSLIB.Topic({
            ros: this.state.ros,
            name: '/odometry/filtered/global',
            messageType: 'nav_msgs/Odometry',
        });
        // -------------------------------------------
        // turn on the sumulation to publish messages
        imu_listener.subscribe((message) => {
            this.setState({ linear_acceleration: message.linear_acceleration.x });
        });
        // -------------------------------------------
        odometry_filtered_global_listener.subscribe((message) => {
            const x = message.pose.pose.position.x;
            const y = message.pose.pose.position.y;
            const angular_velocity = message.twist.twist.angular.z;
            const linear_velocity = message.twist.twist.linear.x;
            const orientation = this.computeOrientation(message.pose.pose.orientation);
            this.setState({ x, y, orientation, angular_velocity, linear_velocity });
        });
        
    }
    computeOrientation(ros_orientation_quaternion) {
        var q = new Three.Quaternion(
            ros_orientation_quaternion.x,
            ros_orientation_quaternion.y,
            ros_orientation_quaternion.z,
            ros_orientation_quaternion.w
          );
          //convert this quaternion into Roll, Pitch and Yaw
          var RPY = new Three.Euler().setFromQuaternion(q);
      
          return RPY["_z"];
    }
    render() { 
        return (
            <Container>
                <Row>
                    <Col>
                        <h4 className='mt-4'>Position:</h4>
                        <p className='mt-0'>x: {this.state.x} </p>
                        <p className='mt-0'>y: {this.state.y} </p>
                        <p className='mt-0'>orientation in radian: {this.state.orientation} </p>
                        <p className='mt-0'>orientation in degrees: {this.state.orientation * (180 / Math.PI)} </p>
                    </Col>
                    <Col>
                        <h4 className='mt-4'>Velocities:</h4>
                        <p className='mt-0'>linear velocity: {this.state.linear_velocity} </p>
                        <p className='mt-0'>angular velocity: {this.state.angular_velocity} </p>
                        <p className='mt-0'>linear acceleration: {this.state.linear_acceleration} </p>
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default RobotState ;