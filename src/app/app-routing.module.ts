import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { FeatureComponent } from './components/feature/feature.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { QuoteComponent } from './components/quote/quote.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ViewTransactionsComponent } from './components/view-transactions/view-transactions.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},


  {path: 'console', component: DashboardComponent, children: [
    {path: 'faq', component: AccountComponent},
    {path: 'getQuote', component: QuoteComponent},
   {path: 'settings', component: SettingsComponent},
    // {path: 'client/edit/:id', component: EditClientComponent, canActivate:[AdminAuthGuard]},
    // {path: 'client/:id', component: ClientDetailsComponent, canActivate:[AdminAuthGuard]},
    {path: 'transaction/:id', component: ViewTransactionsComponent, canActivate: [AdminAuthGuard]},
    {path: 'index', component: LandingComponent},
    {path: '', component: FeatureComponent},

  ] },

  {path: '**', component: ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminAuthGuard]
})
export class AppRoutingModule { }
