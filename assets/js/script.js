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
      // if (!response.ok) {
      //   throw Error('ERROR');
      // }
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
//retrieve openweather data for the current day and display it on screen
function updateWeatherData(data) {
  var cityName = data.name;

  //convert milliseconds to todays date
  var currentDate = new Date(data.dt * 1000);
  var kelvinTemperature = data.main.temp;

  //convert kelvin temp to Fahrenheit and round to nearest hundredth
  var temperature = Math.floor(kelvinTemperature - 273) * (9 / 5) + 32;
  temperature = temperature.toFixed(2);

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
  $('#current-city h1').text(cityName + '-' + currentDate);
  $('#current-city p:nth-of-type(1)').text('Temp: ' + temperature + ' F');
  $('#current-city p:nth-of-type(2)').text('Wind speed: ' + windSpeed + ' Mph');
  $('#current-city p:nth-of-type(3)').text('Humidity: ' + humidity + '%');
}

// Make a function that gets the lat and lon and puts them into the 5 day weather api.
function getFiveDayWeather() {
  var city = $('#search').val();
  console.log('City: ' + city);
  //Get lat and lon of city.
  fetch(
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
      city +
      '&limit=5&appid=9a1b090bc27ef67eb6c614a9437ffe80'
  )
    //check for valid lat and lon
    .then(function (response) {
      console.log(response);
      // if (!response.ok) {
      //   throw Error('ERROR');
      // }
      return response.json();
    })

    //Pass lat and lon values to weather api
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat, lon);
      fetch(
        'https://api.openweathermap.org/data/2.5/forecast?lat=' +
          lat +
          '&lon=' +
          lon +
          '&appid=9a1b090bc27ef67eb6c614a9437ffe80'
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          updateFiveDay(data);
          showWeather();
        });
    });
}

function updateFiveDay(data) {
  var forecastList = data.list;
  $('#five-day').empty(); // Clear the existing forecast items

  for (var i = 0; i < 5; i++) {
    var forecastData = forecastList[i];
    var forecastDate = new Date(forecastData.dt * 1000);
    var temperatureCelsius = Math.floor(forecastData.main.temp - 273.15);
    var temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;
    var iconCode = forecastData.weather[0].icon;
    var windSpeed = forecastData.wind.speed;
    var humidity = forecastData.main.humidity;

    // Create HTML elements for forecast data
    var forecastItem = $('<div>').addClass('forecast-item');
    var forecastDateElement = $('<p>').text(forecastDate.toLocaleDateString());
    var forecastIcon = $('<img>').attr(
      'src',
      'https://openweathermap.org/img/w/' + iconCode + '.png'
    );
    var forecastTempElement = $('<p>').text(
      'Temp: ' + temperatureFahrenheit + '°F'
    );
    var forecastWindElement = $('<p>').text(
      'Wind Speed: ' + windSpeed + ' m/s'
    );
    var forecastHumidityElement = $('<p>').text('Humidity: ' + humidity + '%');

    // Append elements to the forecast item
    forecastItem.append(
      forecastDateElement,
      forecastIcon,
      forecastTempElement,
      forecastWindElement,
      forecastHumidityElement
    );

    // Append the forecast item to the forecast container
    $('#five-day').append(forecastItem);
  }
}

//Unhide the divs displaying the weather.
function showWeather() {
  $('#current-city').css('display', 'block');
  $('#five-day-wind').css('display', 'block');
}

$('#search-btn').click(function () {
  getCity();
  getFiveDayWeather();
});
$('#search').keydown(function (event) {
  if (event.keyCode === 13) {
    getCity();
    getFiveDayWeather();
    event.preventDefault();
  }
});
