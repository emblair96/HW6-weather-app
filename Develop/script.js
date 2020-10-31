$("#searchBtn").on("click", function() {
  event.preventDefault();
  var userSearch = $("#userSearch").val();
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=d2ab85e5641867afdf5ea19703f5bbc4";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var list = response.list;

    for (var i=0; i<list.length; i++) {
      // var weatherData = 
      var date = list[i].dt_txt;
      var tempK = list[i].main.temp;
      var tempF = ((tempK - 273.15) * 1.80 + 32).toFixed(0);
      var humidity = list[i].main.humidity;
      var uvIndex = list[i].main.humidity;
      console.log(date)
      console.log(tempF)

      var lat = response.city.coord.lat;
      var lon = response.city.coord.lon;

      queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=d2ab85e5641867afdf5ea19703f5bbc4"

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log("test")

    });
    }

    


  });

})

