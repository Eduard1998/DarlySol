import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormValid } from '../servicer/FormValid';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  passwordInput: string = '';
  emailInput: string = '';
  passwordHint: string = 'Enter password';
  color: string;
  singInColor: string;
  singInHint: string = 'Enter login and password';
  users: object;
  infoUser: object;

  constructor(fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = fb.group({
      password: ['', Validators.required],
      email: ['', Validators.required]
    }, {
      validator: FormValid.Password
    })
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new FormValid();

  passwordHintFn(){
    if(this.passwordInput === '') {
        this.passwordHint = 'Enter password';
        this.color = '#f44336';
    }else if(this.passwordInput.length < 8 || this.passwordInput.length > 20) { 
      this.passwordHint = 'Password must be from 8 to 20 characters.';
      this.color = '#f44336';
    }else if(/^[a-zA-Z1-9]+$/.test(this.passwordInput) === false) {
      this.passwordHint = 'Password must be in latin letters.';
      this.color = '#f44336';
    }else {
      this.passwordHint = 'Password Confirmed.';
      this.color = '#3f51b5';
    }
  }

  signIn() {
    for(let key in this.users){
      const { email, password, age, sirname, name } = this.users[key];
      if(this.emailInput === '' || this.passwordInput === '') {
        this.singInColor = '#f44336';
      } else if(this.emailInput != email || this.passwordInput != password) {
          this.singInColor = '#f44336';
          this.singInHint = 'Password or login does not exist';        
      } else {
        if(this.emailInput == email && this.passwordInput == password){
          this.infoUser = { name: name + ' ' + sirname, email, age};
          localStorage.setItem('user', JSON.stringify(this.infoUser)); 
          this.router.navigateByUrl('/open-user');
        }
      }
    }
  }

  signUp() {
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
    if(localStorage.getItem('user')) {
      this.router.navigate(['/open-user']);
    }
    this.http.get(`https://darly1solutions.firebaseio.com/.json`).subscribe(data => {
        this.users = data;
    });
  }

}
