/** Modules **/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Components **/
import { LocationSearchComponent } from './location-search.component';
import { WeatherComponent } from './weather.component';
import { HistoryComponent } from './history.component';

/**
 * Routes description for routing and navigation
 */
const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: LocationSearchComponent },
  { path: 'weather/:lat/:lng/:address', component: WeatherComponent },
  { path: 'history', component: HistoryComponent }
];

/**
 * Set import and export parameters
 */
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
