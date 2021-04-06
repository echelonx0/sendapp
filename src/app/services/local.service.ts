import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  transactionRequestsCollection: AngularFirestoreCollection<Transaction>;
  
  //Track the user's transaction so that we can add it to database as a request
  private transactionsSource = new BehaviorSubject<Transaction>({

    id: null, 
    userID: null, 
    currency: null, 
    date: null, 
    amount: null,
    rate: null,
    isPending: true,
    isConcluded: false,
    isCancelled: false

  });

  selectedTransaction = this.transactionsSource.asObservable();
  

  constructor(public database: AngularFirestore) { 

    this.transactionRequestsCollection = this.database.collection('transaction_requests');

  }

   
  setTransactionLog(transaction: Transaction) {
    this.transactionsSource.next(transaction);
  }



//Request transfer

  //Creating a new profile
  requestTransaction(transaction: Transaction) {
    this.database.collection('transaction_requests').doc().set(transaction);
    //this.profileCollection.add(profile);
  }


}
