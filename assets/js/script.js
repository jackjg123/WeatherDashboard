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
          showWeather();
        });
    });
}
//takes weather data and displays it on screen
function updateWeatherData(data) {
  var cityName = data.name;

  //convert milliseconds to todays date
  var currentDate = new Date(data.dt * 1000);
  var kelvinTemperature = data.main.temp;

  //convert kelvin temp to farenheit and round to nearest tenth
  var temperature = Math.floor(kelvinTemperature - 273) * (9 / 5) + 32;
  temperature = temperature.toFixed(1);

  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;
  currentDate = currentDate.toLocaleString();

  console.log('Here are your results:');
  console.log('   City: ' + cityName);
  console.log('   Date: ' + currentDate);
  console.log('   Temperature: ' + temperature + ' F');
  console.log('   Wind Speed: ' + windSpeed + ' mph');
  console.log('   Humidity: ' + humidity + '%');

  // Display the values of the variables to the screen.
  $('#current-city h3').text(cityName + '-' + currentDate);
  $('#current-city p:nth-of-type(1)').text('Temp: ' + temperature + ' F');
  $('#current-city p:nth-of-type(2)').text('Wind speed: ' + windSpeed + ' Mph');
  $('#current-city p:nth-of-type(3)').text('Humidity: ' + humidity + '%');
}

//Unhide the divs displaying the weather.
function showWeather() {
  $('#current-city').css('display', 'block');
  $('#five-day-wind').css('display', 'block');
}

$('#search-btn').click(function () {
  getCity();
});
$('#search').keydown(function (event) {
  if (event.keyCode === 13) {
    getCity();
    event.preventDefault();
  }
});
