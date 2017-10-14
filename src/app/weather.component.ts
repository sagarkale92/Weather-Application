/** Component **/
import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { WeatherChartComponent } from './weather-chart.component';
/** Fetch json data **/
import { Jsonp } from '@angular/http';
/** Routing **/
import { ActivatedRoute, ParamMap } from '@angular/router';
/** Observable objects **/
import { Observable } from 'rxjs/Observable';
/** Map **/
import 'rxjs/add/operator/map';
/** Current time for timezone **/
import * as moment from 'moment-timezone';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit, OnDestroy{
  private sub: any;
  lat: number; // Location lattitude
  lng: number; // Location longitude
  address: string; // Location name
  title: String; // Title
  time: String; // current time
  temperature: number; // Location temperature
  max_temp: number; // Location max temperature
  min_temp: number; // Location min temperature
  forecast: string; // Location Forecast
  summary: String; // Location summary
  precipitation: string; // Location precipitation
  humidity: string; // Location humidity
  windspeed: number; // Location windspeed
  unixTime: number;
  spinnerShow: boolean = false;
  contentShow: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private jsonp: Jsonp
  ) {}

  /**
   * Get current time for timezone.
   * @param  {number} time     time in milliseconds
   * @param  {string} timezone timezone
   * @return {String}          Current time string
   */
  getRealTime(time: number, timezone: string): String{
    var date = moment();
    date.tz(timezone);
    var formatted = date.format("dddd, h:mm A");
    return formatted;
  }

  /**
   * Update weather information.
   * @param {any} results json weather data
   */
  updateWeather(results: any): void{
    this.temperature = results.currently.temperature;
    this.max_temp = results.daily.data[0].temperatureMax;
    this.min_temp = results.daily.data[0].temperatureMin;
    this.forecast = results.daily.summary;
    this.time = this.getRealTime(results.currently.time, results.timezone);
    this.unixTime = results.currently.time*1000;
    this.summary = results.currently.summary;
    this.precipitation = (results.daily.data[0].precipProbability * 100).toFixed(2);
    this.humidity = (results.daily.data[0].humidity * 100).toFixed(2);
    this.windspeed = results.daily.data[0].windSpeed;
  }

  /**
   * Fetch weather data from API
   * @param  {number}          lat Location lattitude
   * @param  {number}          lng Location Longitude
   * @return {Observable<any>}     Weather data
   */
  fetchWeatherData(lat: number, lng: number): Observable<any>{
    var weatherAPI = "https://api.forecast.io/forecast/91ee698f43c3a59ed951bbb970d0bef6/"
    var url = weatherAPI + lat + "," + lng + '?callback=JSONP_CALLBACK';
    return this.jsonp.get(url)
             .map(response => <string[]>response.json());
  }

  /** Init function to get parameters and fetch weather data. **/
  ngOnInit(): void {

    this.spinnerShow = true;
    this.sub = this.route.params.subscribe(params => {
        this.lat = +params['lat'];
        this.lng = +params['lng'];
        this.address = params['address'].replace('/','');
    });

    this.fetchWeatherData(this.lat, this.lng)
    .subscribe(
      results => {
        //console.log(results);
        this.updateWeather(results);
        this.spinnerShow = false;
        this.contentShow = true;
      },
      error => {
        //console.log(error);
        this.spinnerShow = false;
        this.contentShow = true;
      }
    );
  }

  /** Destroy function **/
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
