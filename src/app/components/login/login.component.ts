import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  phoneNumber: number;


  constructor( 
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(res => {
        // this.flashMessage.show('You are now logged in', {
        //   cssClass: 'alert-success', timeout: 1000
        // });
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        // this.flashMessage.show(err.message, {
        //   cssClass: 'alert-danger', timeout: 1000
        // });
      });

    //Angular notifications
  }


}
