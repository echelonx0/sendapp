import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  transactions: Transaction[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
    
  }

}
