import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { PasswordComponent } from './components/password/password.component';
import { RegisterComponent } from './components/register/register.component';

import { FormsModule }   from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FeaturesComponent } from './components/features/features.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuoteComponent } from './components/quote/quote.component';
import { LandingComponent } from './components/landing/landing.component';
import { AccountComponent } from './components/account/account.component';
import { FeatureComponent } from './components/feature/feature.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';

// import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    ErrorComponent,
    PasswordComponent,
    RegisterComponent,
    FeaturesComponent,
    HeroComponent,
    FooterComponent,
    QuoteComponent,
    LandingComponent,
    AccountComponent,
    FeatureComponent,
    SettingsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // FlashMessagesModule.forRoot(),
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000'
      registrationStrategy: "registerImmediately"
    }),
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
