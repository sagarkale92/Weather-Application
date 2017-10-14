/** Component **/
import { Injectable }    from '@angular/core';
import { LocationSearch } from './location-search';

@Injectable()
export class LocationSearchService{
    /**
     * Crates LocationSearch object.
     * @param  {string}         nameIn Location name
     * @param  {number}         latIn  Location lattitude
     * @param  {number}         lngIn  Location longitude
     * @return {LocationSearch}        LocationSearch object
     */
    createLocation( nameIn: string, latIn: number, lngIn: number ): LocationSearch{
        let location: LocationSearch = {
          name: nameIn,
          lat: latIn,
          lng: lngIn
        };
        return location;
    }
}
