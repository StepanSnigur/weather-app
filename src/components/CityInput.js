import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import styled from 'styled-components';

const CityInputWrapper = styled.div`
    width: 100%;
    height: 40px;
    margin-bottom: 40px;
    
    @media (max-width: 380px) {
        height: auto;
        justify-content: center;
        flex-direction: column;
    }
`

const CityInputBlock = ({ onChangeCity }) => {
    return (
        <CityInputWrapper>
            <AlgoliaPlaces
                placeholder='Write your city here'
                options={{
                    appId: 'plSW4AYAD71J',
                    apiKey: '705a8b96422089d6b9fc5164be4f76ee',
                    type: 'city'
                }}
                onChange={({ suggestion }) => onChangeCity(suggestion.name)}
                onError={({ message }) => console.log('Error')}
            />
        </CityInputWrapper>
    )
}

export default CityInputBlock;