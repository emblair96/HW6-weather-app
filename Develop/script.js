var cityName = "chicago"

// var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=d2ab85e5641867afdf5ea19703f5bbc4"

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=d2ab85e5641867afdf5ea19703f5bbc4"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(queryURL)
    console.log(response) 

});