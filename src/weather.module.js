export class GetWeather {
  constructor(location) {
    this.location = location;
    this.initialize();
  }

  initialize() {
    this.getWeatherByLocation();
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
}
