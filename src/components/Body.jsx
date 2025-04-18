import React, { Component } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';

class Body extends Component {
    state = {  } 
    render() { 
        return (
            <Container>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/about' element={<About/>}></Route>
                    </Routes>
                </Router>
            </Container>
        );
    }
}

export default Body;