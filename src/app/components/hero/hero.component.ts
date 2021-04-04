import { Component, OnInit } from '@angular/core';

interface sheet {
  readonly classes: Object
  readonly update: Function
}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
