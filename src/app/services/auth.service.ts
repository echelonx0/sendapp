import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

import { map, last, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser } from '../models/appuser';



@Injectable()
export class AuthService {

  appUser$: Observable<AppUser>;
  loggedIn: Observable<any>;

  constructor(private afAuth: AngularFireAuth, 
    private afs: AngularFirestore
  
    ) { 

      this.appUser$ = this.afAuth.authState.pipe(
        switchMap(user => {
          // If the user is logged in, return the user details.
          if (user) {
            return this.afs.doc<AppUser>(`accounts/${user.uid}`).valueChanges();
          } else {
            // If the user is NOT logged in, return null.
            return of(null);
          }
        })
      );

    }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
      err => reject(err))
    });
  }

  
  
  async registerClient(email: string, password: string, firstName: string, lastName: string, phoneNumber: number){

    let result = await this.afAuth.createUserWithEmailAndPassword(email,password);
    const client = result.user;

    await this.afs.collection('clients').doc(client.uid).set(
      {
        'id': client.uid,
        'firstName': firstName,
        'lastName': lastName,
        'email': client.email,
        'phoneNumber': phoneNumber,
  
      }
    );

    await this.afs.collection('accounts').doc(client.uid).set(
      {
        'id': client.uid,
        'firstName': firstName,
        'lastName': lastName,
        'email': client.email,
        'accounts': [],
        'transactions': [],
        'phoneNumber': phoneNumber,
        'isAdmin': false
      }
    );

    return result;

  }

  
  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }


  getUserStatus(){
    return this.afAuth.authState.pipe(
      switchMap(user => {
        // If the user is logged in, return the user details.
        if (user) {
          return this.afAuth.authState.pipe(map(auth => auth));
        } else {
          // If the user is NOT logged in, return null.
          return of(null);
        }
      })
    );

  }
  


  logout() {
    this.afAuth.signOut();
  }

  
}