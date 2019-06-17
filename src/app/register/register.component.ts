import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormValid } from '../servicer/FormValid';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  formName: FormGroup;
  formSirname: FormGroup; 
  formAge: FormGroup;
  isEmailValidator: boolean = false;
  isValidator: boolean = false;
  isUserExist: boolean = false;
  nameInput: string = '';
  sirnameInput: string = '';  
  ageInput: string = '';
  passwordInput: string = '';
  confirmPasswordInput: string = '';
  emailInput: string = '';
  nameColor: string;
  sirnameColor: string;
  ageColor: string;
  color: string;
  colorConfirm: string;
  nameHint: string = 'Enter name';
  sirnameHint: string = 'Enter sirname';
  ageHint: string = 'Enter age';
  emailHint: string = 'This email is busy';
  passwordHint: string = 'Enter password';
  confirmPasswordHint: string = 'Passwords are not the same';
  users: any = [];

  constructor(fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: FormValid.MatchPassword
    })

    this.formAge = fb.group({
      age: ['', Validators.required]
    }, {
      validator: FormValid.Age
    })

    this.formSirname = fb.group({
      sirname: ['', Validators.required],
      name: ['', Validators.required]
    }, {
      validators: FormValid.Sirname
    })

    this.formName = fb.group({
      name: ['', Validators.required],
      sirname: ['', Validators.required]
      }, {
      validator: FormValid.Name
    })
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  matcher = new FormValid();

  nameHintFn() {
    if(this.sirnameInput === this.nameInput) {
      this.nameHint = 'Name must not be the same';
      this.sirnameHint = 'Name must not be the same';
      this.sirnameColor = '#f44336';
      this.nameColor = '#f44336';
    } else if (/[a-zA-Z]/.test(this.nameInput.trim()) === false) {
      this.nameHint = 'Name must be from letters only';
      this.nameColor = '#f44336';
    }else {
      this.nameHint = 'Name accepted';
      this.nameColor = '#3f51b5';
    }
  }
  sirnameHintFn() {
    if(this.sirnameInput === this.nameInput) {
      this.nameHint = 'Surname must not be the same';
      this.sirnameHint = 'Surname must not be the same';
      this.sirnameColor = '#f44336';
      this.nameColor = '#f44336';
    } else if (/[a-zA-Z]/.test(this.sirnameInput.trim()) === false) {
      this.sirnameHint = 'Surname must be from letters only';
      this.sirnameColor = '#f44336';
    }else {
      this.sirnameHint = 'Sirname accepted';
      this.sirnameColor = '#3f51b5';
    }
  }

  ageHintFn() {
    if(this.ageInput == '') {
      this.ageHint = 'Enter age';
      this.ageColor = '#3f51b5';
    }else if(isNaN(+this.ageInput)) {
      this.ageHint = 'The age should consist of numbers';
      this.ageColor = '#f44336';
    }else if(typeof +this.ageInput === 'number') {
      if(+this.ageInput < 6 || +this.ageInput > 99) {
      this.ageHint = 'Age must be from 6 to 99';
      this.ageColor = '#f44336';
      } else {
        this.ageHint = 'Age accepted';
        this.ageColor = '#3f51b5';
      }
    } else {
      this.ageHint = 'Age accepted';
      this.ageColor = '#3f51b5';
    }
  }

  passwordHintFn(){
    if(this.passwordInput.trim() === '') {
        this.passwordHint = 'Enter password';
        this.color = '#f44336';
    }else if(this.passwordInput.length < 8 || this.passwordInput.length > 20) { 
      this.passwordHint = 'Password must be from 8 to 20 characters.';
      this.color = '#f44336';
    }else if(/^[a-zA-Z1-9]+$/.test(this.passwordInput.trim()) === false) {
      this.passwordHint = 'Password must be in latin letters.';
      this.color = '#f44336';
    }else {
      this.passwordHint = 'Password Confirmed.';
      this.color = '#3f51b5';
    }
  }
  passwordCompatibility() {
    this.colorConfirm = '#f44336';
    if(this.passwordInput.trim() === this.confirmPasswordInput.trim()) {
      this.colorConfirm = '#3f51b5';
      this.confirmPasswordHint = 'Passwords match.';
    }
  }
  marginTopPassword() {
    if(this.passwordInput === '') {
      return '2px'
    } else if (this.passwordInput.length < 8 || this.passwordInput.length > 20) {
      return '14px'
    } else {
      return '2px'
    }
  }

  signIn() {
    this.router.navigateByUrl('/login-user');
  }

  signUp() {
    if(this.nameColor === '#3f51b5' && this.sirnameColor === '#3f51b5' && this.ageColor === '#3f51b5' && this.color === '#3f51b5' && this.colorConfirm === '#3f51b5') {
      this.isValidator = false;
      if(this.users && this.users.length !== 0) {
        if(!this.users.some(element => element.email == this.emailInput)) {
          this.isEmailValidator = false;
          this.isUserExist = false; 
          const infoUser = { name: this.nameInput + ' ' + this.sirnameInput, email: this.emailInput, age: this.ageInput };
          const obj = ({ name: this.nameInput, sirname: this.sirnameInput, age: this.ageInput, email: this.emailInput, password: this.confirmPasswordInput });
          this.http.post("https://darly1solutions.firebaseio.com/.json", obj).subscribe(data => {
            this.router.navigateByUrl('/open-user');
          }); 
          localStorage.setItem('user', JSON.stringify(infoUser));  
        } else {
          this.isUserExist = true; 
        }
      }  
    } else {
      this.isValidator = true;
    }
  }

  ngOnInit() {
    this.http.get("https://darly1solutions.firebaseio.com/.json").subscribe(data => {
      for(let key in data) {
        this.users.push(data[key]);
      }
    });
  }

}