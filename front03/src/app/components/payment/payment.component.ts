import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
 styleUrls:['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalPriceTemporary: number = 0;

  discount: number = 0;
  totalValue: number = 0;
  errDiscount: string = "";
  totalCart: number = 0;
  addressId!: number;
  paymentMethod!: string;
  isClickBtnPayment: boolean = false;
  userId!: string;
  isLoading: boolean = false;

  constructor(

  ) {
  }

  ngOnInit() {

  }



}
