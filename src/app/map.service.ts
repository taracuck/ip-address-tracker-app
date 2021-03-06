import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { secret } from './secrets';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  ipGeoBaseUrl: string =
    'https://geo.ipify.org/api/v1?apiKey=at_h8LnVXMgeLh3AP6CeGl3Vi1uo2cVC';
  ipGeoApiKey: string = secret.api_key;
  mapAccessToken: string = secret.access_token;
  map: any;

  constructor(private http: HttpClient) {}

  getIPGeo = (searchTerm: string) => {
    let params: any = {};
    if (searchTerm) {
      (params.ipAddress = searchTerm), (params.domain = searchTerm);
    }
    return this.http.get(this.ipGeoBaseUrl, {
      params: params,
    });
  };

  getAccessToken = () => {
    return this.mapAccessToken;
  };
}
