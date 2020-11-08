var tempClass = $(".temp").toArray();
var humidityClass = $(".humidity").toArray();
var dateClass = $(".date").toArray();
var date = moment().format("L");
var iconArray = $(".weather-icon").toArray();
var searchHistoryArray = $(".searchBtn").toArray();
var userSearchArray = [];


// When the user clicks the "search button", generate weather data for that city
$(".searchBtn").on("click", function() {
  event.preventDefault();
  userSearch = $("#userSearch").val();
  getWeatherData(userSearch);
  storeLastSearch();

})

// Store the users last search to localStorage
function storeLastSearch() {
  var userSearch = $("#userSearch").val();
  localStorage.setItem("lastSearch", JSON.stringify(userSearch));
};

// Post weather data for last userSearch to the page
function init() {
  var userSearch = JSON.parse(localStorage.getItem("lastSearch"));

  if (userSearch !== null) {
    getWeatherData(userSearch);
  }
};

function getWeatherData(userSearch) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=d2ab85e5641867afdf5ea19703f5bbc4";
   
  /*
  else if ($("#userSearch").val() === "") {


    if ($(this).text() !== "Search") {
    var userHistory = $(this).text();
    
    console.log(userHistory)
    userSearchArray.push(userHistory);
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userHistory + "&appid=d2ab85e5641867afdf5ea19703f5bbc4";
    userHistory = "";
    }
  } 

  else if (lastSearchData !== null) {
    lastSearchData = userSearch;
    console.log(userSearch)
  }
*/

  // Append user search to sidebar unless input field is left empty
  if ($("#userSearch").val() !== "") {
    var userSearchP = $("<button>" + userSearch + "</button>");
    //userSearchP.attr("type", "submit");

    userSearchP.addClass("test btn border rounded searchBtn");
    //userSearchP.push(userSearchArray);
    //userSearchP.text(userSearch);
    $(".search-history").append(userSearchP);
  };

  // Use lat and lon to generate URL to retrieve daily forecast
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      var lat = response.city.coord.lat;
      var lon = response.city.coord.lon;

      $("#cityName").text(response.city.name + " " + date);

      var newQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=d2ab85e5641867afdf5ea19703f5bbc4";

    // ajax call to get daily forecast
    $.ajax({
      url: newQueryURL,
      method: "GET"
    }).then(function(response) {
      console.log(newQueryURL)

      // Update current day
      var currentTempK = response.current.temp;
      var currentTempF = ((currentTempK - 273.15) * 1.80 + 32).toFixed(0); 

      $("#currentTemp").text("Temperature: " + currentTempF);
      $("#currentHumidity").text("Humidity: " + response.current.humidity + "%");
      $("#currentWS").text("Wind Speed: " + response.current.wind_speed + " MPH");
      $("#uvIndex").text(response.current.uvi);
      $("#main-weather-icon").addClass("large-icon");
      $("#main-weather-icon").attr("src", "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");

      // Update 5-day forecast
      for (var i=0; i<5; i++) {
        var daily = response.daily;
        var tempK = daily[i].temp.day;
        var tempF =  ((tempK - 273.15) * 1.80 + 32).toFixed(0);
        var humidity = daily[i].humidity;
        var icon = daily[i].weather[0].icon;

        tempClass[i].innerHTML = "Temp: " + tempF;
        humidityClass[i].innerHTML = "Humidity: " + humidity + "%";
        $(".weather-icon").addClass("small-icon");
        iconArray[i].setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
        
      }

      // Update dates
      for (var j=0; j<dateClass.length; j++) {

      var newDate = moment().add(1+j, 'days');
      formatNewDate = newDate.format("L");
      dateClass[j].innerHTML = formatNewDate;
      }

    });

  });
};

init();
//getWeatherData(); 


/*
When user searches for a city, then the city name gets appended to the sidebar
When user clicks on the name in teh sidebar, then the city weather repopulates
  - Same functoin taht originally populates weather data needs to re-run
  - The text in the element needs to be used for the variable that gets inputted into the API call
  - How do we distinguish 
TO TRY: push to an array each time it is generated

*/














/*
// click function to run search
$(".searchBtn").on("click", function() {
  event.preventDefault();
  var userSearch = $("#userSearch").val();
  console.log("test")

  console.log($(this))

  if (userSearch === "") {
    event.preventDefault();
    var userSearch = $(this).val();
    console.log(userSearch)
    console.log("test")
  }

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=d2ab85e5641867afdf5ea19703f5bbc4";
  $("#userSearch").val("");
   

  // Append user search to sidebar unless input field is left empty
  if (userSearch !== "") {
  var userSearchP = $("<button>");
  userSearchP.addClass("test border rounded btn");
  userSearchP.attr("type", "submit")
  userSearchP.text(userSearch);
  $(".form").append(userSearchP);
  };

  // ajax call to get lat, lon, & city name; lat & lon needed for daily forecast api call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      var lat = response.city.coord.lat;
      var lon = response.city.coord.lon;

      $("#cityName").text(response.city.name + " " + date);

      var newQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=d2ab85e5641867afdf5ea19703f5bbc4";

    // ajax call to get daily forecast
    $.ajax({
      url: newQueryURL,
      method: "GET"
    }).then(function(response) {
      console.log(newQueryURL)

      // Update current day
      var currentTempK = response.current.temp;
      var currentTempF = ((currentTempK - 273.15) * 1.80 + 32).toFixed(0); 

      $("#currentTemp").text("Temperature: " + currentTempF);
      $("#currentHumidity").text("Humidity: " + response.current.humidity + "%");
      $("#currentWS").text("Wind Speed: " + response.current.wind_speed + " MPH");
      $("#uvIndex").text(response.current.uvi);
      $("#main-weather-icon").addClass("large-icon");
      $("#main-weather-icon").attr("src", "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");

      // Update 5-day forecast
      for (var i=0; i<5; i++) {
        var daily = response.daily;
        var tempK = daily[i].temp.day;
        var tempF =  ((tempK - 273.15) * 1.80 + 32).toFixed(0);
        var humidity = daily[i].humidity;
        var icon = daily[i].weather[0].icon;

        tempClass[i].innerHTML = "Temp: " + tempF;
        humidityClass[i].innerHTML = "Humidity: " + humidity + "%";
        $(".weather-icon").addClass("small-icon");
        iconArray[i].setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
        
      }

      // Update dates
      for (var j=0; j<dateClass.length; j++) {

      var newDate = moment().add(1+j, 'days');
      formatNewDate = newDate.format("L");
      dateClass[j].innerHTML = formatNewDate;
      }

    });

  });

})

*/