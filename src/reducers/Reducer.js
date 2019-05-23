import { createStore } from 'redux';

let initialState = {
    weatherForecast: {
        main: {},
        wind: {},
        weather: {
            0: []
        },
        list: []
    }
}

let reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_FORECAST':
            return {
                ...state,
                weatherForecast: action.payload
            }
        default:
            return state;
    }
}

let store = createStore(reducer);

export default store;

