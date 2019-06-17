import {AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

export class FormValid implements ErrorStateMatcher{

    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }

    static Password(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
        if(password.length < 8 || password.length > 20) {
            AC.get('password').setErrors( {MatchPassword: true} )
        } else if (/^[a-zA-Z1-9]+$/.test(password) === false) {
            AC.get('password').setErrors( {MatchPassword: true} )
        }else {
            return null
        }
    }
    static Name(AC: AbstractControl) {
        let sirname = AC.get('sirname').value;
        let name = AC.get('name').value;
        if(sirname === name) {
            AC.get('name').setErrors( {Name: true} )
        } else if (/[a-zA-Z]/.test(name.trim()) === false) {
            AC.get('name').setErrors( {Name: true} )
        }else {
            return null
        }
    }
    static Sirname(AC: AbstractControl) {
        let sirname = AC.get('sirname').value;
        let name = AC.get('name').value;
        if(sirname === name) {
            AC.get('sirname').setErrors( {Sirname: true} )
          } else if (/[a-zA-Z]/.test(sirname.trim()) === false) {
            AC.get('sirname').setErrors( {Sirname: true} )
          }else {
            return null
          }
    }
    static Age(AC: AbstractControl) {
        let age = AC.get('age').value; // to get value in input tag
         if(age == '') {
            AC.get('age').setErrors( {Age: true} )
          }else if(isNaN(+age)) {
            AC.get('age').setErrors( {Age: true} )
          }else if(typeof +age === 'number') {
            if(+age < 6 || +age > 99) {
                AC.get('age').setErrors( {Age: true} )
            } else {
                return null
            }
          } else {
            return null
          }
     }
    
    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        if(password.length < 8 || password.length > 20) {
            AC.get('password').setErrors( {MatchPassword: true} )
        } else if (/^[a-zA-Z1-9]+$/.test(password) === false) {
            AC.get('password').setErrors( {MatchPassword: true} )
        }else {
            return null
        }
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
         if(password != confirmPassword) {
             AC.get('confirmPassword').setErrors( {MatchPassword: true} )
         } else {
             return null
         }
     }
}