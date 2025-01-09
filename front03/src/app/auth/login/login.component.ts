import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {
    this.checkLoggedIn();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    //reset data variable
    this.email = '';
    this.password = '';
    // this.checkLoggedIn();
    // setInterval(() => {
    //   this.checkLoggedIn();
    // }, 1000);
  }

  // check if user is logged in, không cho người dùng vô được login page nếu đã đăng nhập
  checkLoggedIn() {
    if (this.cookieService.get('isLoggedIn')) {
      // this.router.navigate(['/']);
    }
  }

  email: string = '';
  password: string = '';
  isDisabledBtn = true;
  isEmailValid!: string;
  errMessage!: string;

  onEmailChange() {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (this.email === '') {
      this.isEmailValid = '';
      this.isDisabledBtn = true;
      this.errMessage = '* Email không được để trống!';
    } else if (!this.email.match(pattern)) {
      this.isEmailValid = 'falseEmail';
      this.isDisabledBtn = true;
      this.errMessage = '* Email không đúng định dạng!';
    } else if (this.email.match(pattern) && this.password === '') {
      this.isEmailValid = 'trueEmail';
      this.errMessage = '';
      this.isDisabledBtn = true;
    } else {
      this.isEmailValid = 'trueEmail';
      this.errMessage = '';
      this.isDisabledBtn = false;
    }
  }

  isPwValid!: string;
  errMessagePw!: string;

  onPasswordChange() {
    if (this.password === '') {
      this.isPwValid = '';
      this.isDisabledBtn = true;

      this.errMessagePw = '* Mật khẩu không được để trống!';
    } else {
      this.isPwValid = 'truePw';
      this.isDisabledBtn = false;
      this.errMessagePw = '';
    }
  }

  handleLogin() {
    this.authService.login({email: this.email, password: this.password}).subscribe({
      next: res => {
        console.log("Login success: ", res);
      },
      error: err => {
        console.log("Login failed: ", err);
      }
    })
  }
}
