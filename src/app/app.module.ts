/** Modules **/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/** Routing **/
import { AppRoutingModule } from './app-routing.module';
/** Fetch json data **/
import { HttpModule, JsonpModule  } from '@angular/http';
/** Charts display of weather data **/
import { ChartsModule } from 'ng2-charts';
/** Google maps **/
import { AgmCoreModule } from '@agm/core';
/** Local Storage of the application **/
import { Ng2Webstorage } from 'ng2-webstorage';
/** Current time for fetched timezone **/
import { MomentModule } from 'angular2-moment';
/** Spinner for loading **/
import { SpinnerModule } from 'angular-spinners';

/** Component **/
import { AppComponent } from './app.component';
import { LocationSearchComponent } from './location-search.component';
import { WeatherComponent } from './weather.component';
import { HistoryComponent } from './history.component';
import { WeatherChartComponent } from './weather-chart.component';

/** Services to provide **/
import { LocationSearchService } from './location-search.service';

@NgModule({
  declarations: [
    AppComponent,
    LocationSearchComponent,
    WeatherComponent,
    HistoryComponent,
    WeatherChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDyTctqSvp2NncssA0NOOcT_bfgom6Lxtw",
      libraries:["places"]
    }),
    Ng2Webstorage,
    MomentModule,
    SpinnerModule
  ],
  providers: [LocationSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
