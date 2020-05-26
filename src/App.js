import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WeatherService from './services/Service';
import './App.css';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from './reducers/Reducer';

import WeatherCard from './components/WeatherCard';
import HourlyForecastPage from './components/HourlyForecastPage';
import CityInputBlock from './components/CityInput';
import Preloader from './components/Preloader/Preloader';
import ErrorIndicator from './components/ErrorIndicator';

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
    isLoading: true,
    error: false
  }

  async getForecast (city) {
    let response = await new WeatherService().getWeather(city);
    store.dispatch({type: 'LOAD_FORECAST', payload: response});
    this.setState({
      isLoading: false
    });
  }
  changeCity = (city) => {
    if (city) {
      localStorage.setItem('cityName', city);
      this.setState({
        isLoading: true,
        error: false
      });
      this.getForecast(city).catch((err) => this.onError(err));
    }
  }
  onError = (err) => {
    localStorage.removeItem('cityName');
    this.setState({
      error: true,
      loading: false
    });
  }
  prepareComponentToRender = (component) => {
    let ComponentWithPreloader = this.state.isLoading ? <Preloader /> : component;
    return this.state.error ? <ErrorIndicator /> : ComponentWithPreloader;
  }

  componentDidMount () {
    if (localStorage.getItem('cityName')) {
      this.getForecast(localStorage.getItem('cityName'));
    } else {
      this.getForecast('London');
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <MainWrapper>
            <AppContainer>
              <CityInputBlock onChangeCity={(val) => this.changeCity(val)} />

              <Route path="/" exact component={() => this.prepareComponentToRender(<WeatherCard />)}/>
              <Route path="/hourlyForecast" component={() => this.prepareComponentToRender(<HourlyForecastPage />)}/>
            </AppContainer>
          </MainWrapper>
        </Router>
      </Provider>
    );
  }
}

export default App;
