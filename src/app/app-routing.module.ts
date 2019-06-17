import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { AboutGuard } from './login/guards';
import { RegisterComponent } from './register/register.component';
import { OpenUserComponent } from './open-user/open-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-user', pathMatch: 'full'  },
  { path: 'login-user', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'open-user', component: OpenUserComponent, canActivate: [AboutGuard] },
  { path: '**', component: LoginComponent , canActivate: [AboutGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  providers: [AboutGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
