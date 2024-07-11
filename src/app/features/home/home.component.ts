import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../../data/CarData';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { MTableComponent } from "../../m-framework/m-table/m-table.component";
import { MSearchButtonComponent } from "../../m-framework/m-search-button/m-search-button.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MContainerComponent, MCardComponent, MTableComponent, MSearchButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  filterTerm: string = "";
  listofcars: Car[]; 
  headers: string[] = ['ID','Make','Model','Year'];
  constructor(){
    let car1 = new Car(1,"Nissan","Altima",2012);
    let car2 = new Car(1,"Toyota","Corola",2018);
    let car3 = new Car(1,"BMW","X5",2024);

    this.listofcars = []; 
    this.listofcars.push(car1);
    this.listofcars.push(car2);
    this.listofcars.push(car3);
    
  }


}

