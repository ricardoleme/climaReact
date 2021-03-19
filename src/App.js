import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Toast from 'react-bootstrap/Toast'
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { FaCloudversify, FaSpinner, FaCloudRain, FaArrowDown, FaArrowUp, FaWhatsapp }
  from "react-icons/fa"




/* API Geo Referenciamento
* https://opencagedata.com/users/sign_up
* API Fotos
* https://unsplash.com/oauth/applications
* 
* https://api.unsplash.com/search/photos?query=Itu&client_id=SuaChave&page=1&w=1500&dpi=2
*
* API Weather
https://openweathermap.org/api
*/

function App() {
  const [erroGeo, setErroGeo] = useState(null)
  const [obtendoGeo, setObtendoGeo] = useState(false)
  const [erroClima, setErroClima] = useState(null)
  const [obtendoClima, setObtendoClima] = useState(false)
  const [cidade, setCidade] = useState('')
  const [clima, setClima] = useState(null)
  const numeroWhats = '5511941366222' //Prefeitura de Itu




  //Fonte: https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
  const listaErrosGeo = [{ "codigo": 1, "texto": "Não foi dada permissão para o sistema poder encontrar a sua localização" },
  { "codigo": 2, "texto": "Não foi possível obter a sua localização" },
  { "codigo": 3, "texto": "O tempo para obter a sua localização foi expirado!" }]

  useEffect(() => {

    const apikey = process.env.REACT_APP_APIKEY
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        //console.log(position)
        position.coords.latitude && obtemCidade(position.coords.latitude, position.coords.longitude)
      }, function (error) {
        //console.log(error)
        setErroGeo(error.code)
      })
    }
    async function obtemCidade(latitude, longitude) {
      setObtendoGeo(true)
      let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data.results[0].components)
          setCidade(data.results[0].components.city + ', ' + data.results[0].components.country)
        })
        .catch(function (error) {
          console.error('Houve um problema ao efetuar a requisição: ' + error.message);
        });
      setObtendoGeo(false)
    }
  }, [])


  async function obtemClima(cidade) {
    setObtendoClima(true)
    const apiweather = process.env.REACT_APP_OPENWEATHER
    let urlClima = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt&units=metric&appid=${apiweather}`
    await fetch(urlClima)
      .then(response => response.json())
      .then(data => {
        data.cod === '404' ? setErroClima('Cidade não encontrada') : setClima(data)
      })
      .catch(function (error) {
        console.error('Houve um problema ao efetuar a requisição: ' + error.message);
      });
    setObtendoClima(false)
  }


  function detectaMobile() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  function enviaWhats(mensagem) {

    let target = ''
    if (detectaMobile()) {
      // montar o link (número e texto) (app)
      target = `whatsapp://send?phone=${encodeURIComponent(numeroWhats)}&text=${encodeURIComponent(mensagem)}`
    } else {
      // montar o link (número e texto) (web)
      target = `https://api.whatsapp.com/send?phone=${encodeURIComponent(numeroWhats)}&text=${encodeURIComponent(mensagem)}`
    }
    return target
  }

  return (
    <Container fluid={true} className="p-0">
      <Navbar bg="primary">
        <Navbar.Brand href="#home">FateClima</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Início</Nav.Link>
          <Nav.Link href="#contato">Contato</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text"
            placeholder={obtendoGeo ? 'Aguarde, obtendo a cidade...' : 'Informe a cidade'}
            className="sm-3"
            value={cidade} onChange={e => setCidade(e.target.value)} />
                      &nbsp;
          {obtendoGeo && <FaSpinner className="spinner" color="white" />}
          <Button variant="secondary" onClick={() => { obtemClima(cidade) }} >
            {obtendoClima ? <FaSpinner className="spinner" color="white" /> : <FaCloudversify color="white" />}
            &nbsp;Obter Clima</Button>
        </Form>
      </Navbar>

      {erroGeo &&
        <Alert variant="danger" onClose={() => setErroGeo(null)} dismissible>
          <Alert.Heading>Ops! Ocorreu um erro ao obter a sua localização</Alert.Heading>
          <p>
            {listaErrosGeo[erroGeo - 1].texto} <br></br>
            Digite a <strong>cidade</strong> desejada no campo de busca e clique em Obter Clima.
          </p>
        </Alert>
      }
      { erroClima &&
        <Toast onClose={() => setErroClima(null)} delay={4000} autohide className="bg-danger">
          <Toast.Header>
            <strong className="mr-auto">Cidade não encontrada!</strong>
            <small>☹️</small>
          </Toast.Header>
          <Toast.Body className="bg-white text-danger">Por favor, faça uma nova busca.</Toast.Body>
        </Toast>
      }
      <Jumbotron className="jumbotron-background jumbotron-texto">
        <h1><FaCloudRain /> FateClima</h1>
        <p>
          Consulte o clima de qualquer cidade do mundo. <br></br>
          App desenvolvido em ReactJS e integrado com as APIs Opencagedata e OpenWeatherMap
  </p>
      </Jumbotron >
      {obtendoClima &&
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      }
      {clima &&
        <Row className="justify-content-center">
          <Card bg="primary" className="cartao text-center">
            <Card.Header>
              <h2>{clima.name}</h2>
              <h3>{clima.main.temp}&#x2103;</h3> {/*https://www.toptal.com/designers/htmlarrows/symbols/*/}
              <h5>min: {clima.main.temp_min}&#x2103;<FaArrowDown className="text-danger" /> - máx: {clima.main.temp_max}&#x2103;<FaArrowUp className="text-success" /></h5>
            </Card.Header>
            <Card.Body className="bg-dark">
              <Card.Img src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}@4x.png`} title={clima.weather[0].description} />
              <h3 className="text-light">{clima.weather[0].description}</h3>
              <Card.Title className="text-light">Previsão do Tempo</Card.Title>
              <Button variant="success" onClick={e => {
                e.preventDefault()
                window.location.href = enviaWhats(`_FateClima_ informa: A temperatura em *${clima.name}* é de ${clima.main.temp}&#x2103;`)
              }}><FaWhatsapp /> Compartilhar</Button>
            </Card.Body>
            <Card.Footer className="text-light">Atualizado em: {new Date(clima.dt * 1000).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</Card.Footer>
          </Card>
        </Row>
      }
      <Navbar bg="dark" sticky="bottom" id="contato" className="m-1">
        <Navbar.Brand href="#home" className="text-light">
          <FaCloudRain /> FateClima - &copy; 
        </Navbar.Brand>
      </Navbar>
    </Container>
  );
}

export default App;
