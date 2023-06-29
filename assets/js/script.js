var apiKey = '9a1b090bc27ef67eb6c614a9437ffe80';

//Function retrieves lon and lat coordinates from the geo locater openweather api.
function getCity() {
  var city = $('#search').val();

  fetch(
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
      city +
      '&limit=5&appid=' +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Hello \n----------');
      console.log(data);
      // TODO: Loop through the response
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].name);
      }
    });
}
$('#search-btn').on('click', getCity);
