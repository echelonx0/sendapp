import { Component, OnInit } from '@angular/core';
import { Rates } from 'src/app/models/rates';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rates: Rates = {
    randRate: 0.00,
    nairaRate: 0.00,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
