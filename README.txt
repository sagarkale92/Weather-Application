PROJECT NAME:
[
  The Weather APPLICATION
]

AUTHOR:
[
  Sagar Kale <skale4@binghamton.edu>
]

PERCENT COMPLETE:
[
	100%
]

PROJECT DESCRIPTION:
[
  The Weather App displays current weather information and future forecast of any user-selected location.
  The Weather App also displays charts for historic weather information which includes temperature and humidity of user-selected location.
  Additionally, The Weather App allows the user to keeps track of their search history.
]

TECHNOLOGY USED:
[
  ANGULAR CLI   - JavaScript framework
  ANGULAR JS    - JavaScript Library
  JAVASCRIPT    - Object oriented programming
  TYPESCRIPT    - Object oriented programming
  BOOTSTRAP     - Front end
  JQUERY        - Object oriented programming
  HTML5         - Front end View
  CSS           - Front end styling
]

EXAMPLE USAGE:
[
  The application is hosted in AWS with S3
  1. Link 1
  http://weather-app-angular.com.s3-website-us-west-2.amazonaws.com
  2. Link 2
  http://goo.gl/GHVKH3
]

INSTALLATION:
[
  Started Project with following command
  ng new WeatherApp
  cd WeatherApp
  ng serve

  Bootstrap and jQuery to Angular CLI
  npm install bootstrap@3 jquery --save

  Angular Charts
  npm install ng2-charts --save

  Angular Webstorage
  npm install --save ng2-webstorage

  Angular Moment
  npm install --save angular2-moment
  npm install moment-timezone

  Angular Spinner
  npm install angular-spinners --save
]

TESTS:
[
  The following command is used to test the app
  ng test

  Tested if the application is storing unique entry for each location even if the user is searching same location
  multiple times.

  Tested if the entered keywords are matching with the location retrieved from the autocomplete Google Map API.

  Tested if current weather and forecast matches with the actual weather data.
]

DOCUMENTATION:
[
  1. Home Page
  http://weather-app-angular.com.s3-website-us-west-2.amazonaws.com/search
  The page is dedicated to allow user to type the location initial keywords using which the formatted
  city name can be fetched using autocomplete Google Map API.
  The user is allowed to selected location from the autocompleted dropdown menu using which the function
  retrieves location information as follows,

  let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    types: ["(cities)"]
  });
  autocomplete.addListener("place_changed", () => {
    this.ngZone.run(() => {
      /** Gets place information **/
    });
  });

  2. Weather Page
  http://weather-app-angular.com.s3-website-us-west-2.amazonaws.com/weather/{latitude}/{longitude}/{location_name}
  The page is divided into 2 sections
    a. Weather information
    Using latitude and longitude the important information about the weather is fetched and displayed. The Weather API
    is used to fetch the weather information.
    b. Weather Chart
    The weather historic data fetch by the Weather API is displayed using Angular charts.
    The function to fetch weather information is as follows,

    /**
     * Fetch weather data from API
     * @param  {number}          lat Location lattitude
     * @param  {number}          lng Location Longitude
     * @return {Observable<any>}     Weather data
     */
    fetchWeatherData(lat: number, lng: number): Observable<any>{
      var weatherAPI = "https://api.forecast.io/forecast/{API_KEY}"
      var url = weatherAPI + lat + "," + lng + '?callback=JSONP_CALLBACK';
      return this.jsonp.get(url)
               .map(response => <string[]>response.json());
    }

  3. History Page
  http://weather-app-angular.com.s3-website-us-west-2.amazonaws.com/history
  The page retrieves the user location search history from the browser session and displays in a way that
  user can click on the link to get current weather information.
  The clear Search History button is provided to clear search history.
]
