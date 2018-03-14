import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapService {

  constructor(private _http: HttpClient) { }
  getPlace(id){
    let placeObservable = this._http.get('/locations/' + id)
    placeObservable.subscribe(data => console.log(data));
  }
  getPlaces(city, query){
    return this._http.get(`/places_search?city=${city}&query=${query}`)
  }

}
