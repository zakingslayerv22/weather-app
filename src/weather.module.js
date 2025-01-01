export class GetWeather {
  constructor(location) {
    this.location = location;
    this.mainContainer = document.querySelector(".main-container");

    this.searchResultsContainer = document.createElement("div");
    this.searchResultsContainer.classList.add("search-results-container");

    this.initialize();
  }

  initialize() {
    this.getWeatherByLocation();
    this.handleWeatherData();
    this.renderSearchResults();
    this.buildRightSectionForSearchResults();
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

    this.mainContainer.append(this.searchResultsContainer);
    this.searchResultsContainer.append(leftContainer);
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

  buildRightSectionForSearchResults() {
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("right-container");

    const rightContainerTitle = document.createElement("div");
    rightContainerTitle.classList.add("right-container-title");
    rightContainerTitle.textContent = "Today's weather details";

    //temperature
    const temperatureContainer = document.createElement("div");
    temperatureContainer.classList.add("temperature-container");

    const tempAndIconContainer = document.createElement("div");
    tempAndIconContainer.classList.add("temperature-and-icon-container");

    const tempIcon = document.createElement("div");
    tempIcon.classList.add("temperature-icon");

    const temperatureTitle = document.createElement("div");
    temperatureTitle.classList.add("temperature-title");
    temperatureTitle.textContent = "Current temperature";

    const temperatureValue = document.createElement("div");
    temperatureValue.classList.add("temperature-value-container");

    //rain probability
    const rainProbabilityContainer = document.createElement("div");
    rainProbabilityContainer.classList.add("rain-probability-container");

    const rainAndIconContainer = document.createElement("div");
    rainAndIconContainer.classList.add("rain-and-icon-container");

    const rainIcon = document.createElement("div");
    rainIcon.classList.add("rain-icon");

    const rainTitle = document.createElement("div");
    rainTitle.classList.add("temperature-title");
    rainTitle.textContent = "Probability of rain";

    const rainValue = document.createElement("div");
    rainValue.classList.add("rain-value-container");

    //dew point
    const dewPointContainer = document.createElement("div");
    dewPointContainer.classList.add("dew-point-container");

    const dewAndIconContainer = document.createElement("div");
    dewAndIconContainer.classList.add("dew-and-icon-container");

    const dewIcon = document.createElement("div");
    dewIcon.classList.add("dew-icon");

    const dewTitle = document.createElement("div");
    dewTitle.classList.add("dew-point-title");
    dewTitle.textContent = "Dew point";

    const dewValue = document.createElement("div");
    dewValue.classList.add("dew-value-container");

    //wind speed
    const windSpeedContainer = document.createElement("div");
    windSpeedContainer.classList.add("wind-speed-container");

    const windAndIconContainer = document.createElement("div");
    windAndIconContainer.classList.add("wind-and-icon-container");

    const windIcon = document.createElement("div");
    windIcon.classList.add("wind-icon");

    const windTitle = document.createElement("div");
    windTitle.classList.add("wind-point-title");
    windTitle.textContent = "Wind speed";

    const windValue = document.createElement("div");
    windValue.classList.add("wind-value-container");

    //air humidity
    const airHumidityContainer = document.createElement("div");
    airHumidityContainer.classList.add("air-humidity-container");

    const airAndIconContainer = document.createElement("div");
    airAndIconContainer.classList.add("air-and-icon-container");

    const airIcon = document.createElement("div");
    airIcon.classList.add("air-icon");

    const airTitle = document.createElement("div");
    airTitle.classList.add("air-humudity-title");
    airTitle.textContent = "Air humidity";

    const airValue = document.createElement("div");
    airValue.classList.add("air-value-container");

    //uv index
    const uvIndexContainer = document.createElement("div");
    uvIndexContainer.classList.add("uv-index-container");

    const uvAndIconContainer = document.createElement("div");
    uvAndIconContainer.classList.add("uv-and-icon-container");

    const uvIcon = document.createElement("div");
    uvIcon.classList.add("uv-icon");

    const uvTitle = document.createElement("div");
    uvTitle.classList.add("uv-index-title");
    uvTitle.textContent = "UV Index";

    const uvValue = document.createElement("div");
    uvValue.classList.add("uv-value-container");

    this.searchResultsContainer.append(rightContainer);

    rightContainer.append(
      rightContainerTitle,
      temperatureContainer,
      rainProbabilityContainer,
      dewPointContainer,
      windSpeedContainer,
      airHumidityContainer,
      uvIndexContainer,
    );

    temperatureContainer.append(tempAndIconContainer, temperatureValue);
    tempAndIconContainer.append(tempIcon, temperatureTitle);

    rainProbabilityContainer.append(rainAndIconContainer, rainValue);
    rainAndIconContainer.append(rainIcon, rainTitle);

    dewPointContainer.append(dewAndIconContainer, dewValue);
    dewAndIconContainer.append(dewIcon, dewTitle);

    windSpeedContainer.append(windAndIconContainer, windValue);
    windAndIconContainer.append(windIcon, windTitle);

    airHumidityContainer.append(airAndIconContainer, airValue);
    airHumidityContainer.append(airIcon, airTitle);

    uvIndexContainer.append(uvAndIconContainer, uvValue);
    uvAndIconContainer.append(uvIcon, uvTitle);

    return {
      temperatureValue,
      rainValue,
      dewValue,
      windValue,
      airValue,
      uvTitle,
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
