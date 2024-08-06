import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { MSearchButtonComponent } from '../../m-framework/m-search-button/m-search-button.component';
import { MTableComponent } from '../../m-framework/m-table/m-table.component';
import { Doctors } from '../../data/DoctorData';
import { MMapComponent } from '../../m-framework/m-map/m-map.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature1',
  standalone: true,
  imports: [CommonModule, FormsModule, MContainerComponent, MSearchButtonComponent, MTableComponent, MMapComponent],
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


//  doctor: string; 
  //available: string; 
  //filterTerm: string = "";
  //listofdoctors: Doctors[]; 
  //headers: string[] = ['ID','Doctor','Available'];
  //id: number = 1;

  constructor(private router:Router){

    this.doctorname = "";
    this.Atime = 9;
    this.Etime = 5;
    this.listofdoctors = [];
    this.lat=24.4539;
    this.lng=54.3773;

    //this.doctor = "";
    //this.available = "";
    //this.listofdoctors = []; 
  }

  navigateDoctor(){

  }

  getMapInstance(map:any){
    this.map = map;
  }

  goToRating(){
    this.router.navigateByUrl('/feature2');
  }

}
