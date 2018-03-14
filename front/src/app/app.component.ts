import { Component } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  city = '';
  query = '';
  places;
  constructor(private _mapService: MapService){}
  getPlaces(city, query){
    console.log("searching for " + query + " in " + city);
    let placesObservable = this._mapService.getPlaces(city, query);
    placesObservable.subscribe((data) => {
      console.log(data);
      this.places = data;
    });
  }
}
