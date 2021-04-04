import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;


  constructor( private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }


  async onSubmit() {

    this.authService.registerClient(this.email, this.password, this.firstName, this.lastName, this.phoneNumber)
     .then(res => {
       
      //  this.flashMessage.show('Good job! You are now registered', {
      //    cssClass: 'alert-success', timeout: 4000
      //  });
       this.router.navigate(['/account']);
     })
     .catch(err => {
      //  this.flashMessage.show(err.message, {
      //    cssClass: 'alert-danger', timeout: 4000
      //  });
     });


}}
