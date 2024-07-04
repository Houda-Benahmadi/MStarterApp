import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MLoginComponent } from '../../m-framework/m-login/m-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MLoginComponent,CommonModule, FormsModule, MContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  name: string; 
  num: number; 
  result: string; 

  constructor(private router:Router)
  {
    this.name = "";
    this.num = 0; 
    this.result = ""; 
  }

  doButton1Action(){
    console.log("I am presssed 1: "+this.name);
    this.router.navigateByUrl('/feature1');
  }

  doButton2Action(){
    let SquareNum = this.num * this.num;
    console.log("Square of Num is "+SquareNum);
    this.result = "The Square of " + this.num + " is " + SquareNum; 
  }

  squareNum(){
    return this.num * this.num; 
  }
  
}