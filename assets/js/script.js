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
      console.log(response);
      if (!response.ok) {
        throw Error('ERROR');
      }
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      var lat = data.map(function (lat) {
        return lat.lat;
      });
      console.log(lat);
      // .catch(function (error) {
      //   console.log(error);
    });
  //       fetch(
  //         'https://api.openweathermap.org/data/2.5/weather?lat=' +
  //           data +
  //           '&lon=' +
  //           data +
  //           '&appid=' +
  //           apiKey
  //       ).then(function (response) {
  //         return response.json();
  //       });
  //     });
  // }
}
// function addCity() {
//   var city = $('#search').val();
//   if (city === '') {
//     return;
//   }
// }

$('#search-btn').click(function () {
  getCity();
  // addCity();
});
