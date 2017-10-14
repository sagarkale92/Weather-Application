/** Component **/
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherComponent } from './weather.component';
/** Fetch json data **/
import { Jsonp } from '@angular/http';
/** Routing **/
import { ActivatedRoute, ParamMap } from '@angular/router';
/** Fetch current time of timezone. **/
import * as moment from 'moment-timezone';

@Component({
  selector: 'weather-chart',
  templateUrl: './weather-chart.component.html'
})

export class WeatherChartComponent implements OnInit{

  lat: number
  lng: number
  private sub: any;
  weather: WeatherComponent;
  /** barChart Options **/
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [], label: 'Average Temperature (°F)'},
    {data: [], label: 'Humidity(%)'}
  ];

  constructor(
    private route: ActivatedRoute,
    private jsonp: Jsonp
  ) {}

  /**
   * Get day of the week from time.
   * @param  {number} time Current time
   * @param  {string} timezone timezone
   * @param  {number} next next day to add
   * @return {string}      Day of the week
   */
  getDay(time: number, timezone: string, next: number):string{
    var week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var date = moment();
    date.add(next, 'days');
    date.tz(timezone);
    return week[date.day()];
  }

  /**
   * Updates chart from weather information.
   * @param {Array<any>} datas    Array of weather data
   * @param {string}     timezone Timezone
   */
  updateChart(datas: Array<any>, timezone: string):void{
    this.barChartLabels = [];
    this.barChartData[0].data = [];
    this.barChartData[1].data = [];
    let next: number = 0;
    for(let data of datas){
      this.barChartLabels.push(this.getDay(data.time, timezone, next));
      this.barChartData[0].data.push((data.temperatureMax+data.temperatureMin)/2);
      this.barChartData[1].data.push(data.humidity*100);
      next++;
    }
  }

  /**
   * Init function to fetch weather data and chart.
   */
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
        this.lat = +params['lat'];
        this.lng = +params['lng'];
    });

    /** Weather data fetch. **/
    this.weather = new WeatherComponent( this.route, this.jsonp );
    this.weather.fetchWeatherData(this.lat, this.lng)
    .subscribe(
      results => {
        //console.log(results);
        this.updateChart(results.daily.data, results.timezone);
      },
      error => console.log(error)
    );
  }

  /**
   * On exit.
   * @return {[type]} [description]
   */
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
