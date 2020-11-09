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

  // Append user search to search history unless that city is already in their search history
  if ($("#userSearch").val() !== "") {
    var userSearchP = $("<button>" + userSearch + "</button>");
    userSearchP.attr("data-city", $("#userSearch").val());
    userSearchP.addClass("searchHistoryBtn btn btn-outline-primary");

    var newCity = userSearchP.attr("data-city");

    if (userSearchArray.includes(newCity)) {
        }

    else {
        $("#search-history").append(userSearchP);
        userSearchArray.push(newCity);
        storeSearchHistory();
        }
    
    getWeatherData(userSearch);
    storeLastSearch();
    $("#userSearch").val("");
  }

});

// Show weather data for appropriate city if user clicks on search history button
$("#search-history").on("click", ".searchHistoryBtn", function() {
  var userSearch = $(this).attr("data-city");
  getWeatherData(userSearch);
  console.log('test')
});

// Store the users last search to localStorage
function storeLastSearch() {
  var userSearch = $("#userSearch").val();
  localStorage.setItem("lastSearch", JSON.stringify(userSearch));
};

// Store user search history to localStorage
function storeSearchHistory() {
  localStorage.setItem("searchHistory", JSON.stringify(userSearchArray))
};

// Show weather data for last userSearch and re-append user history
function init() {
  var lastSearch = JSON.parse(localStorage.getItem("lastSearch"));
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

  if (userSearch !== null) {
    getWeatherData(lastSearch);
  }

  else if (userSearch === null) {

  };

  for (var i=0; i<searchHistory.length; i++) {
    var userSearchP = $("<button>" + searchHistory[i] + "</button>");
    userSearchP.attr("data-city", searchHistory[i]);
    userSearchP.addClass("searchHistoryBtn btn btn-outline-primary");
    $("#search-history").append(userSearchP);
    userSearchArray.push(searchHistory[i])
  }
};

// Generate the weather data
function getWeatherData(userSearch) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=d2ab85e5641867afdf5ea19703f5bbc4";


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


/*
When user searches for a city, then the city name gets appended to the sidebar
When user clicks on the name in teh sidebar, then the city weather repopulates
  - Same functoin taht originally populates weather data needs to re-run
  - The text in the element needs to be used for the variable that gets inputted into the API call
  - How do we distinguish 
TO TRY: push to an array each time it is generated

*/