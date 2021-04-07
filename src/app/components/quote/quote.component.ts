  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormControl } from '@angular/forms';
  import { Router } from '@angular/router';


  //Solution to fieldvalue problem
  import  firebase from 'firebase/app';
  import { delay } from 'rxjs/operators';
  import { Currency } from 'src/app/models/currency';
  import { Log } from 'src/app/models/log';
  import { Rates } from 'src/app/models/rates';
  import { Transaction } from 'src/app/models/transaction';
  import { AuthService } from 'src/app/services/auth.service';
  import { DataService } from 'src/app/services/data.service';
  import { LocalService } from 'src/app/services/local.service';

  enum SelectedCurrency {
    Naira = "Naira",
    Rands = "Rands",
  }

  @Component({
    selector: 'app-quote',
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.css']
  })
  export class QuoteComponent implements OnInit {

    

    userSelectedCurrency: string = 'Naira';
    notuserSelectedCurrency: string = 'Rands';

    //For notification purposes
    message: String = '';
    buttonMessage: String = 'Ok';
    showAlert: boolean = false;

    //for the purposes of showing the relevant currency
    actionText: string = "Select currency";

    //the amount entered by the user
    amount: number;
    thisQuote: number;

    //The amount we are offering the user
    exchangeAmount: number;

    randRate;
    nairaRate;


    //What to show when user selects a particular currency
    selectedCurrencySymbol: string = 'N';
    

    log: Log;

    // rates: Rates;
    userID: string;
    isLoggedIn: boolean;
    

    transation: Transaction;

    rates: Rates = {
      randRate: 0.00,
      nairaRate: 0.00,
    }

    
    
    constructor(
      private dataService: DataService,   
      private authService: AuthService, 
      private logService: LocalService,
      private router: Router,
      public fb: FormBuilder
      ) { }

    ngOnInit(): void {

      //Pulling in the rates from the server
      this.dataService.getRates().subscribe(rates => {
        if(rates != null) {
          this.rates = rates;
          this.randRate = this.rates.randRate;
          this.nairaRate = this.rates.nairaRate;
        }
        
        this.rates = rates;
      });

      //Get details of logged in user. 
      //In this component, mainly for logging purposes
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

    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    changeCurrencies(currency: string){

      if(currency === 'Rands'){
        this.notuserSelectedCurrency = 'Naira'
        this.selectedCurrencySymbol = 'R'
      } else if (currency === 'Naira'){
        this.notuserSelectedCurrency = 'Rands'
        this.selectedCurrencySymbol = 'N'
      }
    }

    // Choose city using select dropdown
    changeCurrency(event) {
      this.userSelectedCurrency = event.target.value;
      this.changeCurrencies(event.target.value);


    }
    
    onSubmit({value, valid}: {value: Rates, valid: boolean}) {
      if(!valid) {
        this.message = 'Please fill out the form correctly'
        this.showAlert = true;
        
        this.delay(300);
        console.log('Delayed!');

        setTimeout(() => 
          {
            
            this.showAlert = false;
              //this.router.navigate(['/']);
          },
          5000);

        this.showAlert = false;
  
        
      } else {

        // Confirm client's action
        this.dataService.updateRates(value);
        this.message = 'Absolutely well done!s'
        this.showAlert = true;
        this.delay(300)
        this.showAlert = false;
        
        
        // Close the Modal from the back
        
      }
    }


    //To show notifications to users in a variety of situations
    showNotification() {
      //Take in message and button message

      setTimeout(() => 
      {
        //What happens after
        console.log('I delayed for 500 milliseconds');
        this.showAlert = false;
        this.message = '';
          //this.router.navigate(['/']);
      },
      5000);      
      //What happens immediately
      this.message = 'Showing an alert!'
      this.showAlert = true;
    }

    calculateRate(){

      this.thisQuote = this.amount;

      this.log = {
        id: '',
        amount: this.amount,
        currency: this.userSelectedCurrency,
        date: firebase.firestore.FieldValue.serverTimestamp(),
    
      }
      this.dataService.logSearch(this.log);

      if(this.userSelectedCurrency == "Naira"){

        this.exchangeAmount = this.amount/this.nairaRate;

      } else {
        this.exchangeAmount = this.amount * this.randRate;
      }

      this.message = 'Exchange amount is' + this.exchangeAmount;
      this.buttonMessage = 'I accept'
      this.amount = 0.00;
      return this.exchangeAmount;
      

    }

    //After acceptance
    processTransaction(){
      
      if(this.isLoggedIn){

        this.transation = {

          id: '',
          amount: this.amount,
          currency: this.userSelectedCurrency,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          userID: this.userID,
          rate: {
            'randRate': this.randRate,
            'nairaRate': this.nairaRate
          },
          isPending: true,
          isConcluded: false,
          isCancelled: false,
      
        }

        this.logService.setTransactionLog(this.transation);

        //add the transaction to requested transaction column
        this.logService.requestTransaction(this.transation);
        //take him to account page + email him account to pay into
        this.router.navigate(['/console/faq']);

      } else if (!this.isLoggedIn) {

      }

    }


    generateRandom(){
      console.log(Math.random() * 50);
    }

    


  }
