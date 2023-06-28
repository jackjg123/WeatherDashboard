var requestUrl =
  'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={d7e7d0df3f902bbad2a3160eb8ce4406}';

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// fetch(badRequestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
