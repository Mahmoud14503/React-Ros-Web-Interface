import React, { Component } from 'react';
import {Row, Col, Container} from 'react-bootstrap'
class RobotState extends Component {
    state = {  } 
    render() { 
        return (
            <Container>
                <Row>
                    <Col>
                        <h4 className='mt-4'>Position:</h4>
                        <p className='mt-0'>x: odom.pose.pose.x</p>
                        <p className='mt-0'>y: odom.pose.pose.y</p>
                        <p className='mt-0'>orientation:</p>
                    </Col>
                    <Col>
                        <h4 className='mt-4'>Velocities:</h4>
                        <p className='mt-0'>linear velocity: *x^ + y^*</p>
                        <p className='mt-0'>angular velocity: odom.twist.twist.angular</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default RobotState ;