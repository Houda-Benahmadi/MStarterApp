import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';

@Component({
  selector: 'app-feature3',
  standalone: true,
  imports: [CommonModule, MCardComponent, MContainerComponent],
  templateUrl: './feature3.component.html',
  styleUrl: './feature3.component.css'
})
export class Feature3Component {

}
