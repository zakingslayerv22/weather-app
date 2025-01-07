import { BuildDOM } from "./dom.module";

export class GetWeather {
  constructor() {
    this.DOMElements = new BuildDOM();
    this.weatherUnitGroup = "US";
    this.temperatureUnitSign = "°F";
    this.windSpeedUnit = "mph";
    this.weatherUnitSelectField = document.querySelector("#temperature-unit");
    this.mainContainer = document.querySelector(".main-container");
    this.loadingDiv = document.querySelector("#loading-div");
    this.searchFieldValueForWeatherUnitToggle = "";
    this.initialize();
  }

  initialize() {
    this.DOMElements.buildHomepage();
    this.handleSearchButtonClicks();
    this.toggleWeatherUnit();
  }

  prepareUrl(searchLocation, weatherUnitGroup) {
    const firstPartOfUrl =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const encodedSearchQuery = encodeURIComponent(searchLocation);
    const thirdPartOfUrl = "key=U2DCSCQ88LJNVYZCB9SFZGTAV";
    const fullUrl = `${firstPartOfUrl}${encodedSearchQuery}${weatherUnitGroup}${thirdPartOfUrl}`;
    return fullUrl;
  }

  async getWeatherByLocation(searchLocation) {
    this.loadingDiv.classList.add("show");
    try {
      let fullUrl;
      if (this.weatherUnitGroup == "US") {
        fullUrl = this.prepareUrl(searchLocation, "?unitGroup=us&");
        this.temperatureUnitSign = "°F";
        this.windSpeedUnit = "mph";
      } else {
        fullUrl = this.prepareUrl(searchLocation, "?unitGroup=uk&");
        this.temperatureUnitSign = "°C";
        this.windSpeedUnit = "km/h";
      }

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
    } finally {
      this.loadingDiv.classList.remove("show");
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
        temperature: `${weatherData.currentConditions.temp}${this.temperatureUnitSign}`,
        dew: `${weatherData.currentConditions.dew}${this.temperatureUnitSign}`,
        relativeHumidity: `${weatherData.currentConditions.humidity}%`,
        minTemp: `${weatherData.days[0].tempmin}${this.temperatureUnitSign}`,
        maxTemp: `${weatherData.days[0].tempmax}${this.temperatureUnitSign}`,
        conditions: weatherData.days[0].conditions,
        description: weatherData.days[0].description,
        date: weatherData.days[0].datetime,
        rainProbability: `${weatherData.days[0].precipprob}%`,
        icon: weatherData.currentConditions.icon,
        windSpeed: `${weatherData.currentConditions.windspeed} ${this.windSpeedUnit}`,
        uvIndex: weatherData.currentConditions.uvindex,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async renderSearchResults(searchLocation) {
    try {
      const weatherData = await this.handleWeatherData(searchLocation);

      if (!weatherData) {
        throw new Error("Could not fetch Data");
      }

      const leftSectionElements =
        this.DOMElements.buildLeftSectionForSearchResults();
      const rightSectionElements =
        this.DOMElements.buildRightSectionForSearchResults();

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

      this.handleSearchButtonClicks();
    } catch (error) {
      console.log(error);
      this.handleSearchButtonClicks();
    }
  }

  fetchHandleAndRenderWeatherData(searchLocation) {
    this.getWeatherByLocation(searchLocation);
    this.handleWeatherData(searchLocation);
    this.renderSearchResults(searchLocation);
  }

  handleSearchButtonClicks() {
    const searchField = document.querySelector("#search");
    let searchButton = document.querySelector(".search-button");

    // Replace the button with its clone to remove existing event listeners
    const clonedButton = searchButton.cloneNode(true);
    searchButton.replaceWith(clonedButton);

    // Update searchButton to refer to the new clone
    searchButton = clonedButton;

    searchButton.addEventListener("click", () => {
      // searchButton.textContent = "Searching"
      if (searchField.value !== "") {
        this.searchFieldValueForWeatherUnitToggle = searchField.value;
        this.fetchHandleAndRenderWeatherData(searchField.value);
      }
    });

    console.log(searchField);
  }

  toggleWeatherUnit() {
    this.weatherUnitSelectField.addEventListener("change", () => {
      this.weatherUnitGroup = this.weatherUnitGroup === "US" ? "UK" : "US";
      console.log(this.weatherUnitGroup);
      if (this.searchFieldValueForWeatherUnitToggle !== "") {
        this.fetchHandleAndRenderWeatherData(
          this.searchFieldValueForWeatherUnitToggle,
        );
      }
    });
  }
}
