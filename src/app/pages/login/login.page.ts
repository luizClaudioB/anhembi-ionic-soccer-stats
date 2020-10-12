import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string = '';
  public password: string = '';

  constructor() { }

  ngOnInit() {
  }

  logUsername() {
    console.log('username: ' + this.username)
  }

  logPassword() {
    console.log('password: ' + this.password)
  }

}
