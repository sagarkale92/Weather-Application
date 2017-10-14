/** Component **/
import { Component, ElementRef, NgZone, ViewChild, OnInit } from '@angular/core';
import { HistoryComponent } from './history.component';
/** Routing and Navigation **/
import { Router } from '@angular/router';
/** Map loader to search location **/
import { MapsAPILoader } from '@agm/core';
/** Google **/
import {} from 'googlemaps';
/** Autocomplete location **/
import { FormControl } from '@angular/forms';

@Component({
  selector: 'location-search',
  templateUrl: 'location-search.component.html'
})

/**
 * LocationSearchComponent searches the location from user input and prepares link to fetch weather data.
 * @return {[type]} [description]
 */
export class LocationSearchComponent implements OnInit{
  public latitude: number;
  public longitude: number;
  public address: string;
  public searchControl: FormControl;
  public zoom: number;

  private historyComponent: HistoryComponent = new HistoryComponent();

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ){}

  /**
   * Prepares link to fetch weather data and redirects. It also saves history
   * @param {any} place [Place object with lattitude, longitude and location name information]
   */
  private prepareLink(place: any): void{
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.address = place.formatted_address;

    this.historyComponent.updateHistory(this.address, this.latitude, this.longitude);

    this.router.navigateByUrl('/weather/'+this.latitude+'/'+this.longitude+'/'+this.address.replace('/',''));
  }

  /**
   * Initial function to set current location and add autocomplete event handler
   */
  ngOnInit(): void {

    /** Loads the location on autocomplete */
    this.mapsAPILoader.load().then(() => {
      /** Autocompletes the locations **/
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["(cities)"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          /** Gets place information **/
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.prepareLink(place);
        });
      });
    });
  }
}
