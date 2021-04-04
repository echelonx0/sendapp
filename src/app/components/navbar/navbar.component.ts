import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { createPopper } from '@popperjs/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userID: string;
  isLoggedIn: boolean;
  isLoading: boolean = false;

  constructor(

    private authService: AuthService, 
    private router: Router

    ) { }

  ngOnInit(): void {

    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        // this.loggedInUser = auth.email;
        this.userID = auth.uid;
        
        
        // this.isLoading = false;
      } else {
        this.isLoggedIn = false;
      }
    });

  }

  onLogoutClick() {
    this.authService.logout();
    // this.flashMessage.show('You are now logged out', {
    //   cssClass: 'alert-success', timeout: 4000
    // });
    this.router.navigate(['/']);
  }

  onLoginClick(){
    this.router.navigate(['/login']);
  }

  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }


}
