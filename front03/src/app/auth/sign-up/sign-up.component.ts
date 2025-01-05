import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "../../services/payment.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  id!: number;
  constructor(private router:Router, private activatedRoute:ActivatedRoute, private paymentService:PaymentService) {

  }

  checkId(id:number){
    if(!id){
      this.router.navigate(['/']);
    }
    this.paymentService.checkMembership().subscribe({
      next: (res) => {
        console.log("order id is true");
      },
      error: (err) => {
        console.log("order id is false");
        this.router.navigate(['/']);
      },
    });

  }

  ngOnInit() {
    //   togo get id on route
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    })
    //check id
    this.checkId(this.id);
  }

}
