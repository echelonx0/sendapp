import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import firebase from 'firebase';
import { Log } from '../models/log';
import { Rates } from '../models/rates';
import { AppUser } from '../models/appuser';
import { BankAccount } from '../models/account';
import { Transaction } from '../models/transaction';



@Injectable({
  providedIn: 'root',
})
export class DataService {

  loggingCollection: AngularFirestoreCollection<Log>;
  clientDoc: AngularFirestoreDocument<AppUser>;
  ratesDoc: AngularFirestoreDocument<Rates>;
  appUser$: Observable<AppUser>;
  rates: Observable<Rates>;

  transactionsCollection: AngularFirestoreCollection<Transaction>;
  transactions: Observable<Transaction[]>;
  transaction: Observable<Transaction>;

  transactionDoc: AngularFirestoreDocument<Transaction>;

  

  constructor(public database: AngularFirestore) {
    this.database.collection('rates').valueChanges();
    this.loggingCollection = this.database.collection('logs');
    
  }

   

  //Creating a new profile
  logSearch(log: Log) {
    this.database.collection('logs').doc().set(log);
    //this.profileCollection.add(profile);
  }

    //get the user's profile
    getRates(): Observable<Rates> {
      //this.ratesDoc = this.database.doc<Rates>('2FZ0fiiPj7vQIRmg1RjFNs');

      this.ratesDoc = this.database.doc<Rates>(`rates/${'Z0fiiPj7vQIRmg1RjFNs'}`);
      this.rates = this.ratesDoc.snapshotChanges().pipe(map(action => {
        if(action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Rates;
          //data.id = action.payload.id;
          return data;
        }
      }));
  
      return this.rates;
    }
  

        //get all pending transactions
        getTransactions(): Observable<Transaction[]> {

          this.transactionsCollection = this.transactionsCollection = this.database.collection('transaction_requests', ref => ref.orderBy('date', 'desc').where("isPending", "==", true));
          
          this.transactions = this.transactionsCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(action => {
              const data = action.payload.doc.data() as Transaction;
              data.id = action.payload.doc.id;
              return data;
            });
          }));
      
          return this.transactions;
        }


          //get the user's profile
  getTransaction(id: string): Observable<Transaction> {
    this.transactionDoc = this.database.doc<Transaction>(`transaction_requests/${id}`);
    this.transaction = this.transactionDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Transaction;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.transaction;
  }


    
    //Retrieve the user's details
  getUser(id: string): Observable<AppUser> {
    this.clientDoc = this.database.doc<AppUser>(`accounts/${id}`);
    this.appUser$ = this.clientDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as AppUser;
        //data.id = action.payload.id;
        return data;
      }
    }));

    return this.appUser$;
  }


  //Add account
  addAccount(account: BankAccount, documentId: string) {
      var educationDatabaseRef = this.database.collection("accounts").doc(documentId);
      educationDatabaseRef.update({
        accounts: firebase.firestore.FieldValue.arrayUnion(account)
      }
      )
    
    }

    updateRates(rates: Rates) {
      this.ratesDoc = this.database.doc<Rates>(`rates/${'Z0fiiPj7vQIRmg1RjFNs'}`);
      this.ratesDoc.update(rates);
    }


    markPaid(docId: string) {
      this.transactionDoc = this.database.doc<Transaction>(`transaction_requests/${docId}`);
      this.transactionDoc.update(
        {
          'isConcluded': true,
          'isPending': false,
        })
    }


    markCancelled(docId: string) {
      this.transactionDoc = this.database.doc<Transaction>(`transaction_requests/${docId}`);
      this.transactionDoc.update(
        {
          'isCancelled': true,
          'isPending': false,
        })
    }


}