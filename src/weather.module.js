import { BuildDOM } from "./dom.module";

export class GetWeather {
  constructor() {
    this.DOMElements = new BuildDOM();
    this.initialize();
    this.mainContainer = document.querySelector(".main-container");
  }

  initialize() {
    this.DOMElements.buildHomepage();
    this.handleSearchButtonClicks();
  }

  prepareUrl(searchLocation) {
    const firstPartOfUrl =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const encodedSearchQuery = encodeURIComponent(searchLocation);
    const thirdPartOfUrl = "?key=U2DCSCQ88LJNVYZCB9SFZGTAV";
    const fullUrl = `${firstPartOfUrl}${encodedSearchQuery}${thirdPartOfUrl}`;
    return fullUrl;
  }

  async getWeatherByLocation(searchLocation) {
    try {
      const fullUrl = this.prepareUrl(searchLocation);
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

  async handleWeatherData(searchLocation) {
    try {
      const weatherData = await this.getWeatherByLocation(searchLocation);
      // console.log(weatherData);
      if (!weatherData) {
        throw new Error("Could not fetch weather data for this location");
      }

      return {
        address: weatherData.resolvedAddress,
        time: weatherData.currentConditions.datetime,
        temperature: weatherData.currentConditions.temp,
        dew: weatherData.currentConditions.dew,
        relativeHumidity: weatherData.currentConditions.humidity,
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

  async renderSearchResults(searchLocation) {
    const leftSectionElements =
      this.DOMElements.buildLeftSectionForSearchResults();
    const rightSectionElements =
      this.DOMElements.buildRightSectionForSearchResults();

    try {
      const weatherData = await this.handleWeatherData(searchLocation);

      //left section
      leftSectionElements.addressDiv.textContent = weatherData.address;
      leftSectionElements.timeDiv.textContent = weatherData.time;
      leftSectionElements.dateDiv.textContent = weatherData.date;
      leftSectionElements.weatherDescriptionDiv.textContent =
        weatherData.description;
      leftSectionElements.temperatureDiv.textContent = weatherData.temperature;

      leftSectionElements.iconContainer.textContent = "weather-icon";
      leftSectionElements.minTemperatureDiv.textContent = weatherData.minTemp;
      leftSectionElements.maxTemperatureDiv.textContent = weatherData.maxTemp;
      leftSectionElements.conditionsDiv.textContent = weatherData.conditions;

      //right section

      rightSectionElements.temperatureValue.textContent =
        weatherData.temperature;

      rightSectionElements.rainValue.textContent = weatherData.rainProbability;

      rightSectionElements.dewValue.textContent = weatherData.dew;

      rightSectionElements.windValue.textContent = weatherData.windSpeed;

      rightSectionElements.humidityValue.textContent =
        weatherData.relativeHumidity;

      rightSectionElements.uvValue.textContent = weatherData.uvIndex;
    } catch (error) {
      console.log(error);
    }
  }

  fetchHandleAndRenderWeatherData(searchLocation) {
    this.mainContainer.textContent = "";
    this.getWeatherByLocation(searchLocation);
    this.handleWeatherData(searchLocation);
    this.renderSearchResults(searchLocation);
  }

  handleSearchButtonClicks() {
    const searchField = document.querySelector("#search");
    const searchButton = document.querySelector(".search-button");

    searchButton.addEventListener("click", () => {
      this.fetchHandleAndRenderWeatherData(searchField.value);
    });

    console.log(searchField);
  }
}
