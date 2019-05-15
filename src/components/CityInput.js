import React, { Component } from 'react';
import styled from 'styled-components'

let CityInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    margin-bottom: 40px;
    
    @media (max-width: 380px) {
        height: auto;
        justify-content: center;
        flex-direction: column;
    }
`
let CityInput = styled.input`
    box-sizing: border-box;
    width: 80%;
    height: 100%;
    font-size: 20px;
    padding-left: 10px;
    color: #4D4D4D;
    outline: none;
    
    @media (max-width: 380px) {
        width: 225px;
        height: 40px;
        margin: 0 auto;
    }
`
let CityInputButton = styled.button`
    border: none;
    width: 20%;
    height: 100%;
    font-size: 20px;
    color: #4D4D4D;
    outline: none;
    cursor: pointer;
    
    @media (max-width: 380px) {
        width: 225px;
        height: 40px;
        margin: 0 auto;
    }
`

class CityInputBlock extends Component {
    state = {
        cityName: ''
    }
    setCityName = (e) => {
        this.setState({
           cityName: e.target.value
        });
    }
    render() {
        let { onChangeCity } = this.props;
        let { cityName } = this.state;
        return (
            <CityInputWrapper>
                <CityInput placeholder="Enter your city" onChange={this.setCityName} />
                <CityInputButton onClick={() => onChangeCity(cityName)}>Search</CityInputButton>
            </CityInputWrapper>
        )
    }
}

export default CityInputBlock;