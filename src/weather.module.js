export class GetWeather {
  constructor(location) {
    this.location = location;
    this.initialize();
  }

  initialize() {
    this.getWeatherByLocation();
    this.handleWeatherData();
  }

  prepareUrl() {
    const firstPartOfUrl =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const encodedSearchQuery = encodeURIComponent(this.location);
    const thirdPartOfUrl = "?key=U2DCSCQ88LJNVYZCB9SFZGTAV";
    const fullUrl = `${firstPartOfUrl}${encodedSearchQuery}${thirdPartOfUrl}`;
    return fullUrl;
  }

  async getWeatherByLocation() {
    try {
      const fullUrl = this.prepareUrl();
      const response = await fetch(fullUrl, { mode: "cors" });
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Resource not found");
        } else if (response.status === 500) {
          throw new Error("Internal server error");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      const weatherData = await response.json();

      console.log(weatherData);

      return weatherData;
    } catch (error) {
      console.log("Could not fetch the weather information - ", error);
    }
  }

  async handleWeatherData() {
    try {
      const weatherData = await this.getWeatherByLocation();
      // console.log(weatherData);
      if (!weatherData) {
        throw new Error("Could not fetch weather data for this location");
      }

      return {
        address: weatherData.resolvedAddress,
        time: weatherData.currentConditions.datetime,
        temperature: weatherData.currentConditions.temp,
        minTemp: weatherData.days[0].tempmin,
        maxTemp: weatherData.days[0].tempmax,
        conditions: weatherData.days[0].conditions,
        description: weatherData.days[0].description,
        date: weatherData.days[0].datetime,
        humidity: weatherData.currentConditions.humidity,
        rainProbability: weatherData.days[0].precipprob,
        icon: weatherData.currentConditions.icon,
        windSpeed: weatherData.currentConditions.windspeed,
        uvIndex: weatherData.currentConditions.uvindex,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
