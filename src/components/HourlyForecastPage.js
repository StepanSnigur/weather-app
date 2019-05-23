import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { connect } from 'react-redux';
import * as config from "./IconsBase";

import '../App.css';

let CardWrapper = styled.div`
    width: 100%;
    height: 200px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
    
    @media (max-width: 440px) {
        width: 225px;
        height: auto;
        display: block;
    }
`
let CurrentDate = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgb(41, 41, 41);
    color: #fff;
    
    h2 {
        font-size: 35px;
        font-weight: 300;
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
let CurrentTemp = styled.p`
    position: relative;
    box-sizing: border-box;
    width: 50%;
    text-align: center;
    align-self: center;
    justify-content: center;
    margin: 0 auto;
    padding-left: 30px;
    
    
    &::before {
        content: url('https://img.icons8.com/ios/30/ffffff/temperature.png');
        width: 30px;
        height: 30px;
        display: block;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
    }
`

class HourlyForecastPage extends Component {
    getHumanDate = (unixDate, isGettingTime) => {
        let humanDate = new Date(unixDate * 1000);
        if (!isGettingTime) {
            return `${humanDate.getDate()}/${(humanDate.getMonth()+1)}/${humanDate.getFullYear()}`;
        } else {
            return `${humanDate.getHours()}:00`;
        }
    }
    render() {
        let { data } = this.props;
        let forecastDataList = data.list.slice(0, 4);
        let forecastList = forecastDataList.map((el) => {
            return (
                <CardWrapper key={el.dt}>
                    <CurrentDate>
                        <h2>{this.getHumanDate(el.dt, true)}</h2>
                        <h3>{this.getHumanDate(el.dt, false)}</h3>
                    </CurrentDate>
                    <CurrentWeather>
                        <CurrentWeatherImage>
                            <img src={config.default[el.weather[0].icon]} alt="Weather icon"/>
                        </CurrentWeatherImage>
                        <CurrentWeatherInfo>
                            <CurrentTemp>{Math.round(el.main.temp - 273)} &deg;C</CurrentTemp>
                            <CurrentWeatherWind>{el.wind.speed} <span>km/h</span></CurrentWeatherWind>
                        </CurrentWeatherInfo>
                    </CurrentWeather>
                </CardWrapper>
            )
        });

        return (
            <div>
                {forecastList}
                <Link className="pageLink forecastPageLink" to="/">Go to main page</Link>
            </div>
        );
    }
}

let mapStateToProps = ({ weatherForecast }) => {
    return {
        data: weatherForecast
    }
}

export default connect(mapStateToProps)(HourlyForecastPage);