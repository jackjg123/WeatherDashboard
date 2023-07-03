var apiKey = '9a1b090bc27ef67eb6c614a9437ffe80';

//Function retrieves lon and lat coordinates from the geo locater openweather api.
function getCity() {
  var city = $('#search').val();

  //Get lat and lon of city.
  fetch(
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
      city +
      '&limit=5&appid=' +
      apiKey
  )
    //check for valid lat and lon
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        throw Error('ERROR');
      }
      return response.json();
    })

    //Pass lat and lon values to weather api
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      fetch(
        'https://api.openweathermap.org/data/2.5/weather?lat=' +
          lat +
          '&lon=' +
          lon +
          '&appid=' +
          apiKey
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          console.log(data.dt);
          updateWeatherData(data);
        });
    });
}
//takes weather data and displays it on screen
function updateWeatherData(data) {
  var cityName = data.name;

  //need to convert dt from seconds to milliseconds for the toLocalDateString
  var currentDate = new Date(data.dt * 1000);
  var kelvinTemperature = data.main.temp;
  var temperature = Math.floor(kelvinTemperature - 273) * (9 / 5) + 32;
  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;
  currentDate = currentDate.toLocaleString();

  console.log('City: ' + cityName);
  console.log('date in milliseconds: ' + currentDate);
  console.log('temperature: ' + temperature);
  console.log('wind speed: ' + windSpeed);
  console.log('humidity: ' + humidity);
  $('#current-city h3').text(cityName + '-' + currentDate);
  $('#current-city p:nth-of-type(1)').text('Temp: ' + temperature + ' F');
  $('#current-city p:nth-of-type(2)').text('Wind speed: ' + windSpeed + ' mph');
  $('#current-city p:nth-of-type(3)').text('Humidity: ' + humidity + '%');
}

$('#search-btn').click(function () {
  getCity();
});
