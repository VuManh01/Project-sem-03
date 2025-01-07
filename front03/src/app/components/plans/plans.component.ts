import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {PaymentService} from "../../services/payment.service";
import {MembershipPurchaseDTO} from "../../dto/membershipPurchaseDTO";
import {NavigationEnd, Router} from "@angular/router";
import {MembershipService} from "../../services/membership.service";
import {MembershipServiceModel} from "../../models/membershipService.model";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']

})

export class PlansComponent implements OnInit {
  constructor(private paymentService: PaymentService,
              private router: Router,
              private membershipService: MembershipService,
              private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    //init data membership
    this.getMembership();
    this.cdr.detectChanges();
  }

  membershipPurcharse: MembershipPurchaseDTO = {membershipServiceId: 0, price: 0};
  membershipServiceList: MembershipServiceModel[] = [];

  handlePayment(membershipServiceId: number, price: number) {
    const width = 1000;
    const height = 700;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    this.membershipPurcharse.membershipServiceId = membershipServiceId;
    this.membershipPurcharse.price = price;
    if (this.membershipPurcharse.membershipServiceId === 0 && this.membershipPurcharse.price === 0) {
      console.log("membershipServiceId: ", membershipServiceId);
      console.log("price: ", price);
      console.log("err");
      return;
    }
    this.paymentService.purchaseMembership(this.membershipPurcharse).subscribe({
      next: (res) => {
        console.log("res: ", res);
        const payUrl = res.paymentUrl;
        const popup = window.open(payUrl, "_blank", `width=${width},height=${height},left=${left},top=${top}`);
        if (!popup) {
          alert("Popup bị chặn. Hãy kiểm tra cài đặt trình duyệt.");
        } else {
          window.addEventListener('message', (event) => {
            if (event.origin !== 'http://localhost:5211') {
              console.warn('Event từ nguồn không xác định:', event.origin);
              return;
            }

            console.log("Event data: ", event.data);
            const paymentStatus = event.data.paymentStatus; // success | error
            const orderId = event.data.orderId;
            if (paymentStatus === 'success') {
              console.log('Thanh toán thành công!');
              this.router.navigate([`/signup/${orderId}`]);
            } else if (paymentStatus === 'error') {
              console.log('Thanh toán thất bại!');
              this.router.navigate(['/']);
            }
            // close popup if popup is open
            popup.close();
          });
        }

      },
      error: err => {
        console.log("err to payment: ", err);
      },

    })
  }


  confirmDeletion(membershipServiceId: number, price: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I choose this plan'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("step 1");
        console.log("membershipServiceId: ", membershipServiceId);
        console.log("price: ", price);
        this.handlePayment(membershipServiceId, price);
      }
    });
  };


  getMembership() {
    this.membershipService.getMembership().subscribe({
      next: (res) => {
        this.membershipServiceList = res;
      },
      error: (err) => {
        console.log("err to get membership: ", err);
      }
    });
  }
}
