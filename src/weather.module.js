export class GetWeather {
  constructor(location) {
    this.location = location;
    this.initialize();
  }

  initialize() {
    this.getWeatherByLocation();
  }
}
