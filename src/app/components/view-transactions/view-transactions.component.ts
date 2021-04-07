import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/models/appuser';
import { Transaction } from 'src/app/models/transaction';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {


  id: string;
  transaction: Transaction;

  dummyAmount: number = 45000;
  depositAmount: number = 45000;
  hasBalance: boolean;
  user: AppUser;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.dataService.getTransaction(this.id).subscribe(transaction => {
      if(transaction != null) {
        this.transaction = transaction;
        this.getUser();
      }
      
      this.transaction = transaction;
    });

    

  }


  markCancelled(){
    this.dataService.markCancelled(this.id);
  }


  markPaid(){
    this.dataService.markPaid(this.id);
  }





  getUser(){

    this.dataService.getUser(this.transaction.userID).subscribe(user => {
      if(user != null) {
        
        this.user = user;
            
   
      }
      
    });
  }




}

