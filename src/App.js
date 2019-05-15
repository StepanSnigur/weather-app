import React, { Component } from 'react';
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom';
import WeatherService from './services/Service';
import './App.css';
import styled from 'styled-components';

import WeatherCard from './components/WeatherCard';
import HourlyForecastPage from './components/HourlyForecastPage';
import CityInputBlock from './components/CityInput';
import Preloader from './components/Preloader/Preloader';
import ErrorIndicator from './components/ErrorIndicator/ErrorIndicator';

let MainWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
`
let AppContainer = styled.div`
  width: 440px;
  margin: 0 auto;
  margin-top: 130px;
`

class App extends Component {
  state = {
    weatherForecast: {
      main: {},
      wind: {},
      weather: {
        0: []
      },
      list: []
    },
    isLoading: true,
    error: false
  }

  async getForecast (city) {
    let response = await new WeatherService().getWeather(city);
    this.setState({
      weatherForecast: response,
      isLoading: false
    });
  }
  changeCity = (city) => {
    if (city) {
      localStorage.setItem('cityName', city);
      this.setState({
        isLoading: true
      });
      this.getForecast(city).catch((err) => this.onError(err));
    }
  }
  prepareComponentToRender = (component) => {
    let ComponentWithPreloader = this.state.isLoading ? <Preloader /> : component;
    return this.state.error ? <ErrorIndicator /> : ComponentWithPreloader;
  }
  onError = (err) => {
    localStorage.removeItem('cityName');
    this.setState({
      error: true,
      loading: false
    });

  }

  componentDidMount () {
    if (localStorage.getItem('cityName')) {
      this.getForecast(localStorage.getItem('cityName'));
    } else {
      this.getForecast('London');
    }
  }

  render() {
    let data = this.state.weatherForecast;
    return (
      <Router>
        <HashRouter>
          <MainWrapper>
            <AppContainer>
              <CityInputBlock onChangeCity={(val) => this.changeCity(val)} />

              <Route path="/" exact component={() => this.prepareComponentToRender(<WeatherCard data={data} />)}/>
              <Route path="/hourlyForecast" component={() => this.prepareComponentToRender(<HourlyForecastPage data={data} />)}/>

            </AppContainer>
          </MainWrapper>
        </HashRouter>
      </Router>
    );
  }
}

export default App;
