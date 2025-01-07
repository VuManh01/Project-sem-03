import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  dataUser!: any;
  constructor(private cookieService: CookieService, private auth: AuthService, private router: Router) { }
  ngOnInit() {
  this.checkLoggedIn();
  setInterval(() => {
    this.checkLoggedIn();
  }, 1000);
}

  checkLoggedIn(){
    if(this.cookieService.get('isLoggedIn')) {
      const dataUserJson = this.cookieService.get('dataUser');
      if (dataUserJson) {
        this.dataUser = JSON.parse(dataUserJson);
      }
    }
  }
  handleLogout(){
    console.log("Logout");
    this.auth.logout().subscribe({
      next: (res) => {
        //call be to delete cookie
        this.cookieService.delete('isLoggedIn');
        this.cookieService.delete('dataUser');
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.log("Logout failed: ", err);
      }
    })
  }
}
