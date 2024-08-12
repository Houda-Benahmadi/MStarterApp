import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MSearchButtonComponent } from '../../m-framework/m-search-button/m-search-button.component';
import { MTableComponent } from '../../m-framework/m-table/m-table.component';
import { Doctors } from '../../data/DoctorData';
import { MMapComponent } from '../../m-framework/m-map/m-map.component';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { MAhaComponent } from '../../m-framework/m-aha/m-aha.component';

//@ts-ignore
declare var google; // Forward Declaration

interface Location {
  ID: number;
  "Hospital Name": string;
  "Estimated Distance": string;
}

@Component({
  selector: 'app-feature1',
  standalone: true,
  imports: [CommonModule, FormsModule, MContainerComponent, MSearchButtonComponent, MTableComponent, MMapComponent, MAhaComponent],
  templateUrl: './feature1.component.html',
  styleUrl: './feature1.component.css'
})
export class Feature1Component {
  doctorname: string;
  Atime: number;
  Etime: number;
  filterTerm: string = "";
  headers: string[];
  listofdoctors: Doctors[];
  lat: number;
  lng: number;
  map: any;
  CityName: string;
  list: any[];

  listofLocations: Location[] = [];
  showLocationTable: boolean = false;
  showClosestLocationTable: boolean = false;
  closestLocation: Location[] = [];
  headersClosest: string[] = ['ID', 'Hospital Name', 'Estimated Distance'];
  markersArray: any[] = []; 

  constructor(private router: Router, private firebaseService: FirebaseService) {
    this.doctorname = "";
    this.Atime = 9;
    this.Etime = 5;
    this.listofdoctors = [];
    this.lat = 24.4539;
    this.lng = 54.3773;
    this.CityName = "";
    this.list = [];
    this.headers = ['ID', 'Hospital Name', 'Estimated Distance'];
  }

  async loadLocationsForTable() {
    const markers = await this.firebaseService.readList("/markers");

    if (markers.length === 0) {
      return;
    }

    this.listofLocations = markers.map((marker, index) => ({
      ID: index + 1,
      "Hospital Name": marker.name,
      "Estimated Distance": `${this.calculateDistance(this.lat, this.lng, marker.lat, marker.lon).toFixed(2)} km`
    }));
  }

  ngOnInit() {
    this.loadLocationsForTable();
  }

  getMapInstance(map: any) {
    this.map = map;
  }

  clearMarkers() {
    this.markersArray.forEach(marker => marker.setMap(null));
    this.markersArray = [];
  }

  placeMarkersOnMap(markers: any[]) {
    this.clearMarkers();
    markers.forEach(marker => {
      const mapMarker = new google.maps.Marker({
        map: this.map,
        position: { lat: marker.lat, lng: marker.lon },
        title: marker.name
      });
      this.markersArray.push(mapMarker); 
    });
  }

  async showClosestMarker() {
    this.showLocationTable = false;

    const currentLat = this.lat;
    const currentLng = this.lng;

    const markers = await this.firebaseService.readList("/markers");

    if (markers.length === 0) {
      return;
    }

    let closestMarker = markers[0];
    let closestDistance = this.calculateDistance(currentLat, currentLng, markers[0].lat, markers[0].lon);

    markers.forEach(marker => {
      const distance = this.calculateDistance(currentLat, currentLng, marker.lat, marker.lon);
      if (distance < closestDistance) {
        closestMarker = marker;
        closestDistance = distance;
      }
    });

    this.closestLocation = [{
      ID: 1,
      "Hospital Name": closestMarker.name,
      "Estimated Distance": `${closestDistance.toFixed(2)} km`
    }];

    this.showClosestLocationTable = true;
    this.map.setCenter({ lat: closestMarker.lat, lng: closestMarker.lon });

    
    this.placeMarkersOnMap([closestMarker]);
  }

  async showNearestMarkers() {
    this.showClosestLocationTable = false;

    const currentLat = this.lat;
    const currentLng = this.lng;

    const markers = await this.firebaseService.readList("/markers");

    if (markers.length === 0) {
      return;
    }

    const maxDistance = 5;
    const nearestMarkers = markers.filter(marker => {
      const distance = this.calculateDistance(currentLat, currentLng, marker.lat, marker.lon);
      return distance <= maxDistance;
    });

    if (nearestMarkers.length === 0) {
      return;
    }

    this.listofLocations = nearestMarkers.map((marker, index) => ({
      ID: index + 1,
      "Hospital Name": marker.name,
      "Estimated Distance": `${this.calculateDistance(this.lat, this.lng, marker.lat, marker.lon).toFixed(2)} km`
    }));

    this.showLocationTable = true;

    
    this.placeMarkersOnMap(nearestMarkers);
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  navigateDoctor(item: any) {
    console.log('Navigating with data:', item);

    
    const hospitalName = item['Hospital Name']; 
    const distance = item['Estimated Distance'];

    if (hospitalName) {
      this.router.navigate(['/feature3'], { 
        state: { 
          hospital: hospitalName,
          distance: distance 
        } 
      });
    } else {
      console.error('No hospital name found in item.');
    }
  }
  
  

  goToRating() {
    this.router.navigateByUrl('/feature2');
  }
}
