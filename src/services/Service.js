class WeatherService {
    makeRequest = (url, options = {}) => {
        return fetch (url, options).then((data) => {
            if (data.status !== 200) {
                throw new Error('error');
            }
            return data.json();
        });
    }
    getWeather (city) {
        return this.makeRequest(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=33e5b3d626cf67b969c8375603bd379d`);
    }
}

export default WeatherService;