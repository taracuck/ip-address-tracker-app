import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { animationFrameScheduler } from 'rxjs';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  searchTerm: string = '';
  ipGeolocation: any;
  mymap: any;
  accessToken!: string;
  customMarker: any;
  apiLoaded: boolean = false;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.getAndSetIpGeoLocation();
    this.getMapId();
    this.getAccessToken();
  }

  getMapId = () => {
    this.mymap = L.map('mapid', { zoomControl: false });
  };

  getAndSetIpGeoLocation = () => {
    this.mapService.getIPGeo(this.searchTerm).subscribe((response) => {
      console.log(response);
      this.ipGeolocation = response;
      this.apiLoaded = true;
      this.setMap();
    });
  };

  setSearchTerm = (searchTerm: string) => {
    this.searchTerm = searchTerm;
    this.getAndSetIpGeoLocation();
  };

  setMap = () => {
    this.mymap.setView(
      [this.ipGeolocation?.location.lat, this.ipGeolocation?.location.lng],
      10
    );
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: this.accessToken,
      }
    ).addTo(this.mymap);

    let myIcon = L.icon({
      iconUrl: '/assets/icon-location.svg',
      iconSize: [40, 50],
      iconAnchor: [10, 30],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    });
    if (this.customMarker) {
      this.customMarker.remove();
    }
    this.customMarker = L.marker(
      [this.ipGeolocation.location.lat, this.ipGeolocation.location.lng],
      { icon: myIcon }
    ).addTo(this.mymap);
  };

  getAccessToken = () => {
    this.accessToken = this.mapService.getAccessToken();
    console.log(this.accessToken);
  };
}
