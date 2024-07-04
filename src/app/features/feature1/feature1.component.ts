import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
//Step 1: Import 
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature1',
  standalone: true,
  imports: [CommonModule, FormsModule, MContainerComponent],
  templateUrl: './feature1.component.html',
  styleUrl: './feature1.component.css'
})
export class Feature1Component {

  //Step 2: Inject
  constructor(private router:Router)
  {
  }
  goHome(){
    //Step 3: Call to navigate
    this.router.navigateByUrl('/home')
  }
  goFeature2(){
    this.router.navigateByUrl('/feature2');
  }
}
