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
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { FaCloudversify } from "react-icons/fa"
import { FaSpinner } from "react-icons/fa"
import { FaCloudRain } from "react-icons/fa"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"



/* API Geo Referenciamento
* https://opencagedata.com/users/sign_up
* API Fotos
* https://unsplash.com/oauth/applications
* 
* https://api.unsplash.com/search/photos?query=Itu&client_id=71fab1070168597fcfd2bf922067b1b266a00074285460c4fa4e1967dff36384&page=1&w=1500&dpi=2
*
* API Weather
https://openweathermap.org/api
http://api.openweathermap.org/data/2.5/weather?q=Indaiatuba,br&lang=pt&units=metric&appid=62f17a7cff53cf644e40267fda2b5aa3
*/

function App() {
  const [erro, setErro] = useState(null)
  const [cidade, setCidade] = useState('')
  const [clima, setClima] = useState(null)

  //Fonte: https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
  const errosGeo = [{ "codigo": 1, "texto": "Não foi dada permissão para o sistema poder encontrar a sua localização" },
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


  async function obtemClima(cidade){
    const apiweather = process.env.REACT_APP_OPENWEATHER
    let urlClima=`http://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt&units=metric&appid=${apiweather}`
    await fetch(urlClima)
      .then(response => response.json())
      .then(data => {
       setClima(data)
      })
      .catch(function (error) {
        console.error('Houve um problema ao efetuar a requisição: ' + error.message);
      });
  }


  return (
    <>
      <Navbar bg="primary">
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
          <Button variant="outline-dark" onClick={() => {obtemClima(cidade)}} ><FaCloudversify color="white" /> Obter Clima</Button>
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
      <Jumbotron className="jumbotron-background jumbotron-texto">
  <h1><FaCloudRain/> FateClima</h1>
  <p>
    Consulte o clima de qualquer cidade do mundo. <br></br>
    App desenvolvido em ReactJS e integrado com as APIs Opencagedata e OpenWeatherMap
  </p>
</Jumbotron >
{clima &&

<Row className="justify-content-center">

      <Card bg="primary" className="cartao text-center">
      <Card.Header>
        <h2>{clima.name}</h2>
        <h3>{clima.main.temp}&#x2103;</h3> {/*https://www.toptal.com/designers/htmlarrows/symbols/*/}
        <h5>min: {clima.main.temp_min}&#x2103;<FaArrowDown className="text-danger" /> - máx: {clima.main.temp_max}&#x2103;<FaArrowUp className="text-success"/></h5>
      <Card.Img  src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}@4x.png`}  title={clima.weather[0].description}/>
    <h3 className="text-white">{clima.weather[0].description}</h3>
    </Card.Header>
    <Card.Body>

      <Card.Title>Previsão do Tempo</Card.Title>
      <Card.Text>

      </Card.Text>
    </Card.Body>
    <Card.Footer className="text-white">Atualizado em: {new Date(clima.dt * 1000).toLocaleString('pt-BR',{timeZone: 'America/Sao_Paulo'})}</Card.Footer>
  </Card>
  </Row>
}
    </>
  );
}

export default App;
