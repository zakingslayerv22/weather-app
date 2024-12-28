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
      const fullSearchUrl = this.prepareUrl();
      const response = await fetch(fullSearchUrl, { mode: "cors" });
      const weatherData = await response.json();

      console.log(weatherData);

      return weatherData;
    } catch (error) {
      console.log(
        "Could not retrieve weather details for this location-",
        error,
      );
    }
  }
}
