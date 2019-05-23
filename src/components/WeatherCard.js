import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { connect } from 'react-redux';
import * as config from "./IconsBase";

import '../App.css';

let CardWrapper = styled.div`
    width: 100%;
    height: 200px;
    margin: 0 auto;
    display: flex;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
    
    @media (max-width: 440px) {
        width: 225px;
        height: auto;
        display: block;
    }
`
let CurrentTemp = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgb(41, 41, 41);
    color: #fff;
    
    h2 {
        font-size: 75px;
        font-weight: 300;
    }
    h3 {
        text-transform: uppercase;
        font-size: 30px;
        font-weight: 700;
    }
    
    @media (max-width: 440px) {
        width: 100%;
        height: 180px;
    }
`
let CurrentWeather = styled.div`
    height: 100%;
    width: 50%;
    
    @media (max-width: 440px) {
        width: 100%;
    }
`
let CurrentWeatherImage = styled.div`
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    
    @media (max-width: 440px) {
        height: 140px;
    }
`
let CurrentWeatherInfo = styled.div`
    height: 30%;
    display: flex;
    justify-content: space-between;
    background: rgb(42, 178, 234);
    color: #fff;
    font-weight: 700;
`
let CurrentWeatherWind = styled.p`
    position: relative;
    width: 50%;
    text-align: center;
    align-self: center;
    justify-content: center;
    margin: 0 auto;
    
    span {
        display: block;
    }
    &::before {
        content: url('https://img.icons8.com/ios/30/ffffff/wind-filled.png');
        width: 30px;
        height: 30px;
        display: block;
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
    }
`
let CurrentWeatherHumidity = styled.p`
    position: relative;
    box-sizing: border-box;
    width: 50%;
    text-align: center;
    align-self: center;
    justify-content: center;
    margin: 0 auto;
    padding-left: 30px;
    
    
    &::before {
        content: url('https://img.icons8.com/metro/30/ffffff/clouds.png');
        width: 30px;
        height: 30px;
        display: block;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
    }
`

class WeatherCard extends Component {
    render() {
        let { data } = this.props;
        let CurrentWeatherData = data.list[0];
        return (
            <>
                <CardWrapper>
                    <CurrentTemp>
                        <h2>{Math.round(CurrentWeatherData.main.temp - 273)}&deg;C</h2>
                        <h3>{data.city.name}</h3>
                    </CurrentTemp>
                    <CurrentWeather>
                        <CurrentWeatherImage>
                            <img src={config.default[CurrentWeatherData.weather[0].icon]} alt="Weather icon" />
                        </CurrentWeatherImage>
                        <CurrentWeatherInfo>
                            <CurrentWeatherHumidity>{CurrentWeatherData.main.humidity} %</CurrentWeatherHumidity>
                            <CurrentWeatherWind>{CurrentWeatherData.wind.speed} <span>km/h</span></CurrentWeatherWind>
                        </CurrentWeatherInfo>
                    </CurrentWeather>
                </CardWrapper>
                <Link className="pageLink" to="/hourlyForecast">View hourly forecast</Link>
            </>
        );
    }
}

let mapStateToProps = ({ weatherForecast }) => {
    return {
        data: weatherForecast
    }
}

export default connect(mapStateToProps)(WeatherCard);