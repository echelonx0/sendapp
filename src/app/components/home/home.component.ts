import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { LocalService } from 'src/app/services/local.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showPwaPrompt: boolean;
  deferredPrompt: Event;
  askedOnce: any;

  updatesAvailable: boolean = false;

  promptEvent: any;

  constructor(
    private dataService: DataService, 
    private authService: AuthService, 
    private logService: LocalService,
    private router: Router, 
    private swUpdate: SwUpdate
    ) {


      swUpdate.available.subscribe(event => {

        //Still need to figure how this works
        if (this.updatesAvailable) {
          window.location.reload();
        }
  
       // this.updatesAvailable = true;
  
      });

     }

  ngOnInit(): void {



    //configuring PWA
    window.addEventListener('beforeinstallprompt', (event) => {
      this.promptEvent = event;
    });

  }

}
