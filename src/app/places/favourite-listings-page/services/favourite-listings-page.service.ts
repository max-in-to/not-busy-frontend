import { Injectable } from '@angular/core';
import { LatLng } from 'src/app/shared/interfaces/lat-lng.interface';
import { Place } from '../../../shared/interfaces/place.interface';
import { HttpClient } from '@angular/common/http';
import { BaseAPIService } from 'src/app/shared/services/base-api.service';
import { AuthService } from 'src/app/users/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteListingsPageService {

  constructor(private http: HttpClient, private api: BaseAPIService, private authServ: AuthService) { }

  searchPlacesByLocationWithAuth(user_id: string, auth_token: string, location: LatLng):Promise<Array<Place>>{

    return new Promise<Array<Place>>((resolve,reject) => {
        let params = { params: {lat: location.lat.toString(), lng: location.lng.toString()}};
        params['headers'] = { Authorization: 'Bearer ' + auth_token };
        
        this.http.get(this.api.getBaseHref() + '/places/favs/' + user_id, params)
        .subscribe(
          data => {
            resolve(<Array<Place>>data['places']);
          },
          err => {
            reject();
          }
        );
      
    })
  }
}

