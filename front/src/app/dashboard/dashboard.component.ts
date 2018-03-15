import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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

  ngOnInit() {
  }

}
