import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @Input() title?:string; 
  image:string=""; 
  @Input() category?:string; 

  constructor() { }

  ngOnInit(): void {


      this.image = "/assets/images/music-hero.jpeg"

  }

}
