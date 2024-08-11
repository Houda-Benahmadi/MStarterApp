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
declare var google;

interface LocationData {
  name: string; // Location name
  availableTime: number; // Available time in hours
  estimatedTime: number; // Estimated arrival time in minutes
}

class Location{
  lat: number;
  lon: number;
  constructor(lat: number, lon: number){
    this.lat = lat; this.lon = lon; 
  }
}
class Toast{
  message: string; 
  type: string;
  duration: number; 
  header: string; 
  ngIfControl: boolean; 
  constructor(message: string, type:string, header: string, duration:number)
  {
    this.message = message; 
    this.type = type; 
    this.header = header; 
    this.duration = duration; 
    this.ngIfControl = false;
  }
  show(){
    this.ngIfControl = true; 
    setTimeout(()=>{
       this.ngIfControl = false; 
     },this.duration);
     return this;
  }
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
  headers: string[] = ['ID','Doctor Name','Available Time (in 24h) ','Estimated Arrival Time (in min)'];
  listofdoctors:Doctors[];
  lat:number;
  lng:number;
  map:any;
  CityName: string;
  counter: number;
  myInt: any; 
  list: any[];
  toast: any; 

  constructor(private router:Router, private firebaseService:FirebaseService){

    this.doctorname = "";
    this.Atime = 9;
    this.Etime = 5;
    this.listofdoctors = [];
    this.lat=24.4539;
    this.lng=54.3773;
    this.CityName = ""; 
    this.counter = 0; 
    this.list = [];
    this.toast = new Toast("","","",100);
  }

  drawMarker(latitude: number, longitude: number){
    const marker = new google.maps.Marker({
      map: this.map,
      position: {lat: latitude, lng: longitude},
    });

    this.firebaseService.pushToList("/markers", { lat: latitude, lon: longitude });
  }



  getMapInstance(map: any)
  {
    this.map = map;
    this.map.addListener("click", (event:any) => {
      let location = event.latLng;
      this.drawMarker(location.lat(),location.lng());
      this.list.push(new Location(location.lat(),location.lng()));
    });
  }
calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // Method: Get the closest marker from Firebase and display it on the map
  async showClosestMarker() {
    const currentLat = this.lat;
    const currentLng = this.lng;

    const markers = await this.firebaseService.readList("/markers");

    if (markers.length === 0) {
      this.toast = new Toast("No markers found.", "error", "Error", 3000).show();
      return;
    }

    // Find the closest marker by distance
    let closestMarker = markers[0];
    let closestDistance = this.calculateDistance(currentLat, currentLng, markers[0].lat, markers[0].lon);

    markers.forEach(marker => {
      const distance = this.calculateDistance(currentLat, currentLng, marker.lat, marker.lon);
      if (distance < closestDistance) {
        closestMarker = marker;
        closestDistance = distance;
      }
    });

    // Display the closest marker on the map
    this.drawMarker(closestMarker.lat, closestMarker.lon);
    this.map.setCenter({ lat: closestMarker.lat, lng: closestMarker.lon });
    this.toast = new Toast("Closest location displayed.", "success", "Info", 2000).show();
  }

  // Method: Get the nearest markers (within a specific distance) from Firebase and display them on the map
  async showNearestMarkers() {
    const currentLat = this.lat;
    const currentLng = this.lng;

    const markers = await this.firebaseService.readList("/markers");

    if (markers.length === 0) {
      this.toast = new Toast("No markers found.", "error", "Error", 3000).show();
      return;
    }

    const maxDistance = 5; // Set a maximum distance in km to consider a location "nearby"
    const nearestMarkers = markers.filter(marker => {
      const distance = this.calculateDistance(currentLat, currentLng, marker.lat, marker.lon);
      return distance <= maxDistance;
    });

    if (nearestMarkers.length === 0) {
      this.toast = new Toast("No nearby locations found.", "error", "Error", 3000).show();
      return;
    }

    // Display the nearest markers on the map
    nearestMarkers.forEach(marker => {
      this.drawMarker(marker.lat, marker.lon);
    });
    this.toast = new Toast("Nearest locations displayed.", "success", "Info", 2000).show();
  }

  storeRoute(){
    if(this.CityName)
    {
        this.firebaseService.addToList("/routes",{CityName: this.CityName, locations: this.list});
        this.toast = new Toast("Route Stored","success","Info",2000).show(); 
    }
  }

  async getRouteFromFirebase(){
    let routes = [];
    routes = await this.firebaseService.readList("/routes");
    let routeFound = false; 
    routes.forEach(route => {
      if(route.CityName == this.CityName)
      {
        routeFound = true; 
        this.list = route.locations; 
        this.list.forEach(location=>{
          this.map.setCenter({lat:location.lat, lng:location.lon});
          this.drawMarker(location.lat,location.lon)
        });
      }
    });
    if(!routeFound)
      this.toast = new Toast("Route not found. Check Your City.","error","Error",3000).show();
  }

  async playRoute(){
    this.counter = 0; 
    this.list = [];
    let routeFound = false; 
    let routes = await this.firebaseService.readList("/routes");
    routes.forEach((route)=>{
      if(route.CityName == this.CityName)
        {
          routeFound = true; 
          this.list = route.locations; 
          let initialLocation = new Location(this.list[0].lat,this.list[0].lon);
          
          this.firebaseService.create("/driverlocation", initialLocation).then(()=>{
          this.myInt = setInterval(()=>{
            let currentLocation = new Location(this.list[this.counter].lat,this.list[this.counter].lon);
            this.map.setCenter({lat:currentLocation.lat, lng:currentLocation.lon});
            this.firebaseService.update("/driverlocation","", currentLocation)
            this.counter++;
            if(this.counter >= this.list.length) 
            {
              clearInterval(this.myInt);
              this.toast = new Toast("Route replay complete.","success","Info",3000).show();
            }
          },3000);
          });
        }
    });
    if(!routeFound)
      this.toast = new Toast("Route not found. Check the number.","error","Error",3000).show();
    
  }

  navigateDoctor(){
    this.router.navigateByUrl('/feature3');
  }


  goToRating(){
    this.router.navigateByUrl('/feature2');
  }

}
