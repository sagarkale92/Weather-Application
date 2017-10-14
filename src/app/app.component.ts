/** Component **/
import { Component, OnInit } from '@angular/core';
import { LocationSearchComponent } from './location-search.component';

/** Component specifications **/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/** AppComponent holds title to the Weather app and starting point of the application. **/
export class AppComponent {
  /** @type {String} Title of the application. */
  title = 'Weather App';

}
