import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatButtonToggleModule,} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { OpenUserComponent } from './open-user/open-user.component';
import { AboutGuard } from './login/guards';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OpenUserComponent
  ],
  imports: [
    MatButtonModule, 
    MatCheckboxModule, 
    MatDialogModule, 
    MatButtonToggleModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AboutGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
