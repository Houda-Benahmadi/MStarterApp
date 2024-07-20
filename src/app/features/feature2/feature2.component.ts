import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MLoginComponent } from '../../m-framework/m-login/m-login.component';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { MResultBoxComponent } from '../../m-framework/m-result-box/m-result-box.component';

@Component({
  selector: 'app-feature2',
  standalone: true,
  imports: [MLoginComponent,CommonModule, FormsModule, MContainerComponent, MCardComponent,MResultBoxComponent],
  templateUrl: './feature2.component.html',
  styleUrl: './feature2.component.css'
})
export class Feature2Component {

  Feedback:string;
  Rating:number;
 
 
  constructor()
  {
    this.Feedback = "";
    this.Rating= 0;
 
  }
 
 
 
  RatingConditionClass() {
    if (this.Rating == 1) return 'error';
    else if (this.Rating == 2) return 'warning';
    else if (this.Rating == 3) return 'normal';
    else if (this.Rating == 4) return 'success';
    else if (this.Rating == 5) return 'success';
    else return 'error';
  }
  RatingConditionLabel() {
    if (this.Rating == 1) return 'Unsatisfied';
    else if (this.Rating == 2) return 'Slightly Unsatisfied';
    else if (this.Rating == 3) return 'Neutral';
    else if (this.Rating == 4) return 'Slightly Satisfied';
    else if (this.Rating == 5) return 'Satisfied';
    else return 'Invalid Rating';
 
  }
 
}


