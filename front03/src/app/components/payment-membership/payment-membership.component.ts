import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-membership',
  templateUrl: './payment-membership.component.html',
  styleUrls: ['./payment-membership.component.css']
})
export class PaymentMembershipComponent implements OnInit {
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
    private router: Router,

  ) {
  }

  ngOnInit() {

  }



}
