import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdGpsFixed } from "react-icons/md";

function App() {

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;
  
    console.log('Sua posição atual é:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('Mais ou menos ' + crd.accuracy + ' metros.');
  };
  
  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  function obterGeoLocalizacao() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }


  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">FateClima</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Início</Nav.Link>
          <Nav.Link href="#contato">Contato</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Informe a cidade..." className="ml-sm-4" />
          <Button variant="success" size="sm"
            title="Obter a localização"
            onClick={obterGeoLocalizacao}>
            <MdGpsFixed color="white" /> Obter a Localização
          </Button>
          <Button variant="outline-light">Procurar</Button>
        </Form>
      </Navbar>

    </>
  );
}

export default App;
