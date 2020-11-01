var tempClass = $(".temp").toArray();
var humidityClass = $(".humidity").toArray();

$("#searchBtn").on("click", function() {
  event.preventDefault();
  var userSearch = $("#userSearch").val();
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=d2ab85e5641867afdf5ea19703f5bbc4";
  

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL)
      var list = response.list;
      var city = response.city.name 
      var lat = response.city.coord.lat;
      var lon = response.city.coord.lon;

      var newQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=d2ab85e5641867afdf5ea19703f5bbc4"

    $.ajax({
      url: newQueryURL,
      method: "GET"
    }).then(function(response) {
      
      var daily = response.daily;
      
      for (var i=0; i<5; i++) {

        var tempK = daily[i].temp.day;
        var tempF =  ((tempK - 273.15) * 1.80 + 32).toFixed(0);
        var humidity = daily[i].humidity;
        var windSpeed = daily[i].wind_speed;
        var uvIndex = daily[i].uvi;
        var icon = daily[i].weather[0].icon;

        tempClass[i].innerHTML = "Temp: " + tempF;
        humidityClass[i].innerHTML = "Humidity: " + humidity + "%"
       
        
      }

    });
    

    


  });

})

