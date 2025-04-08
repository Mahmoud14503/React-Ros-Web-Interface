import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from 'react-bootstrap/esm/Container';
import Body from './components/Body';
function App() {
  return (
    <Container>
    <div className="App">
      <Header />
      <Body />
      <Footer/>
    </div>
    </Container>
  );
}

export default App;
