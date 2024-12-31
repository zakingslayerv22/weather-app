export class GetWeather {
  constructor(location) {
    this.location = location;
    this.mainContainer = document.querySelector(".main-container");
    this.initialize();
  }

  initialize() {
    this.getWeatherByLocation();
    this.handleWeatherData();
    this.renderSearchResults();
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

  buildLeftSectionForSearchResults() {
    this.mainContainer.textContent = "";

    const searchResultsContainer = document.createElement("div");
    searchResultsContainer.classList.add("search-results-container");

    const leftContainer = document.createElement("div");
    leftContainer.classList.add("left-container");

    const homeAndSearchContainer = document.createElement("div");
    homeAndSearchContainer.classList.add("home-and-search-container");

    const homeButton = document.createElement("div");
    homeButton.classList.add("home-button");

    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");

    const searchField = document.createElement("input");
    searchField.setAttribute("type", "search");
    searchField.setAttribute("id", "search");
    searchField.setAttribute("placeholder", "Search by location");

    const searchButton = document.createElement("button");
    searchButton.textContent = "Search";
    searchButton.classList.add("search-button");

    const infoContainerLeft = document.createElement("div");
    infoContainerLeft.classList.add("info-container-left");

    const topContainer = document.createElement("div");
    topContainer.classList.add("top-container");

    const bottomContainer = document.createElement("div");
    bottomContainer.classList.add("bottom-container");

    const addressAndTimeContainer = document.createElement("div");
    addressAndTimeContainer.classList.add("address-and-time-container");

    const addressDiv = document.createElement("div");
    addressDiv.classList.add("address-div");

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("time-div");

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date-div");

    const weatherDescriptionDiv = document.createElement("div");
    weatherDescriptionDiv.classList.add("weather-description-div");

    const temperatureAndIconContainer = document.createElement("div");
    temperatureAndIconContainer.classList.add("temperature-and-icon-container");

    const temperatureDiv = document.createElement("div");
    temperatureDiv.classList.add("temperature");

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon-container");

    const minAndMaxAndConditionContainer = document.createElement("div");
    minAndMaxAndConditionContainer.classList.add(
      "min-max-and-condition-container",
    );

    const minAndMaxTemperatureContainer = document.createElement("div");
    minAndMaxTemperatureContainer.classList.add(
      "min-max-temperature-container",
    );

    const minTemperatureDiv = document.createElement("div");
    minTemperatureDiv.classList.add("min-temp-div");

    const maxTemperatureDiv = document.createElement("div");
    maxTemperatureDiv.classList.add("max-temp-div");

    const conditionsDiv = document.createElement("div");
    conditionsDiv.classList.add("conditions-div");

    //append

    this.mainContainer.append(searchResultsContainer);
    searchResultsContainer.append(leftContainer);
    leftContainer.append(homeAndSearchContainer, infoContainerLeft);

    homeAndSearchContainer.append(homeButton, searchContainer);
    searchContainer.append(searchField, searchButton);

    infoContainerLeft.append(topContainer, bottomContainer);

    topContainer.append(
      addressAndTimeContainer,
      dateDiv,
      weatherDescriptionDiv,
    );

    bottomContainer.append(
      temperatureAndIconContainer,
      minAndMaxAndConditionContainer,
    );

    temperatureAndIconContainer.append(temperatureDiv, iconContainer);

    addressAndTimeContainer.append(addressDiv, timeDiv);

    minAndMaxAndConditionContainer.append(
      minAndMaxTemperatureContainer,
      conditionsDiv,
    );

    minAndMaxTemperatureContainer.append(minTemperatureDiv, maxTemperatureDiv);

    return {
      addressDiv,
      timeDiv,
      dateDiv,
      weatherDescriptionDiv,
      temperatureDiv,
      iconContainer,
      minTemperatureDiv,
      maxTemperatureDiv,
      conditionsDiv,
    };
  }

  async renderSearchResults() {
    const leftSectionElements = this.buildLeftSectionForSearchResults();

    try {
      const weatherData = await this.handleWeatherData();
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
    } catch (error) {
      console.log(error);
    }
  }
}
