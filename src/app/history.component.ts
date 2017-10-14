/** Component **/
import { Component, OnInit } from '@angular/core';
/** LocationSearch class **/
import { LocationSearch } from './location-search';
/** Services **/
import { LocationSearchService } from './location-search.service';
import { LocalStorageService } from 'ng2-webstorage';

@Component({
  selector: 'history',
  templateUrl: './history.component.html'
})

export class HistoryComponent{
  locations: Array<LocationSearch>;
  private locationSearchService: LocationSearchService = new LocationSearchService();
  private localStorage: LocalStorageService = new LocalStorageService();

  constructor(){}

  clearSearchHistory(): void{
    this.locations = Array<LocationSearch>();
    this.localStorage.store('locationSearchHistory', this.locations);
  }

  /**
   * Check for duplicate entry of search history
   * @param  {Array<LocationSearch>} locations Array of LocationSearch objects
   * @param  {LocationSearch}        location  LocationSearch object to store
   * @return {boolean}                         Returns true if object already present else returns false.
   */
  duplicate(locations: Array<LocationSearch>, location:LocationSearch):boolean{
    for(var i=0; i<locations.length; i++){
      if(locations[i].name == location.name) return true;
    }
    return false;
  }

  /**
   * Adds new searched history to local storage.
   * @param  {string} addressIn Address of the searched location.
   * @param  {number} latIn     Lattitude of the searched Location
   * @param  {number} lngIn     Longitude of the searched location.
   * @return {[type]}           [description]
   */
  updateHistory( addressIn: string, latIn: number, lngIn: number ){
    let location: LocationSearch = this.locationSearchService.createLocation( addressIn, latIn, lngIn );
    this.locations = this.localStorage.retrieve('locationSearchHistory');
    if(this.locations == null) this.locations = Array<LocationSearch>();
    if(!this.duplicate(this.locations, location)) this.locations.push(location);
    this.localStorage.store('locationSearchHistory', this.locations);
  }

  /**
   * Init function to update the history view by model.
   * @return {[type]} [description]
   */
  ngOnInit(): (void){
    this.locations = this.localStorage.retrieve('locationSearchHistory');
  }
}
