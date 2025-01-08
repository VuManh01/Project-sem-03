import {Component, OnInit} from '@angular/core';
import { routeAnimations } from './route-animations';
import { RouterOutlet } from '@angular/router';
import {LoadingService} from "./services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: `<div [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>`,
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit{
  isLoading: boolean = false;
  title = 'fesem03';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  constructor(private loadingService: LoadingService) {
  }
  ngOnInit() {
    this.loadingService.isGlobalLoading$.subscribe((value) => {
      this.isLoading = value;
      console.log("isLoading: ", value);
    });
  }

}
