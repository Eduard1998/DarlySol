import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-open-user',
  templateUrl: './open-user.component.html',
  styleUrls: ['./open-user.component.scss']
})
export class OpenUserComponent implements OnInit {
  user: object;
  constructor(public http: HttpClient, public router: Router) { }

  SignOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
