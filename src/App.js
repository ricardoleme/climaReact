import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { FaCloudversify } from "react-icons/fa"
import { FaSpinner } from "react-icons/fa";


/* API Geo Referenciamento
* https://opencagedata.com/users/sign_up
*/

function App() {
  const [erro, setErro] = useState(null)
  const [cidade, setCidade] = useState(null)

  //Fonte: https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
  const errosGeo = [{ "codigo": 1, "texto": "Não foi dada permissão para o sistema poder encontrar a sua localização" },
  { "codigo": 2, "texto": "Não foi possível obter a sua localização" },
  { "codigo": 3, "texto": "O tempo para obter a sua localização foi expirado!" }]

  useEffect(() => {
    const apikey = process.env.REACT_APP_APIKEY
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        //console.log(position)
        obtemCidade(position.coords.latitude, position.coords.longitude)
      }, function (error) {
        //console.log(error)
        setErro(error.code)
      })
    }
    async function obtemCidade(latitude, longitude){
      let url=`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data.results[0].components)
          setCidade(data.results[0].components.city+', '+data.results[0].components.country)
        })
        .catch(function (error) {
          console.error('Houve um problema ao efetuar a requisição: ' + error.message);
        });
    }
  }, [])

  


  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">FateClima</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Início</Nav.Link>
          <Nav.Link href="#contato">Contato</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Informe a cidade..." className="sm-3"  
                      value={cidade} onChange={e => setCidade(e.target.value)}/>
                      &nbsp;
          { !cidade && !erro &&
          <FaSpinner className="spinner" color="white" title="Obtendo a cidade..."/>            
           }
          <Button variant="outline-dark" ><FaCloudversify color="white" /> Obter Clima</Button>
        </Form>
      </Navbar>
      
      {erro &&
        <Alert variant="danger" onClose={()=>setErro(null)} dismissible>
          <Alert.Heading>Ops! Ocorreu um erro ao obter a sua localização</Alert.Heading>
          <p>
            {errosGeo[erro-1].texto} <br></br>
            Digite a <strong>cidade</strong> desejada no campo de busca e clique em Procurar.
          </p>
        </Alert>
      }
      <CardDeck>
      <Card>
    <Card.Img variant="top" src="http://holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title that wraps to a new line</Card.Title>
      <Card.Text>
        This is a longer card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
  </Card>
  </CardDeck>
    </>
  );
}

export default App;
