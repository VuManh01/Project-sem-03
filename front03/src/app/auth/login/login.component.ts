import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private authService: AuthService, private router:Router, private cookieService: CookieService) {
  }
  ngOnInit() {
    //reset data variable
    this.email = '';
    this.password = '';
      this.checkLoggedIn();
      setInterval(() => {
        this.checkLoggedIn();
      }, 1000);
  }

  // check if user is logged in, không cho người dùng vô được login page nếu đã đăng nhập
  checkLoggedIn() {
    if (this.cookieService.get('isLoggedIn')) {
      this.router.navigate(['/']);
    }
  }
  email:string = '';
  password:string = '';

  handleLogin(){
    this.authService.login({email: this.email, password: this.password}).subscribe({
      next: res =>{
        console.log("Login success: ", res);
      },
      error: err =>{
        console.log("Login failed: ", err);
      }
    })
  }
}
