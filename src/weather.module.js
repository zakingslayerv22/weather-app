export class GetWeather {
  constructor(location) {
    this.location = location;
    this.initialize();
  }

  initialize() {
    this.getWeatherByLocation();
  }

  async getWeatherByLocation() {
    const firstPartOfUrl =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const encodedSearchQuery = encodeURIComponent(this.location);
    const thirdPartOfUrl = "?key=U2DCSCQ88LJNVYZCB9SFZGTAV";
    let fullUrl = `${firstPartOfUrl}${encodedSearchQuery}${thirdPartOfUrl}`;

    const response = await fetch(fullUrl, { mode: "cors" });

    const weatherData = await response.json();
    console.log(weatherData);

    return weatherData;
  }
}
