import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
    
  }

}
