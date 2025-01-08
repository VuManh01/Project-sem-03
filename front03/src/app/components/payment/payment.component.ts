import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookModel} from "../../models/book.model";
import {PaymentService} from "../../services/payment.service";
import {DiscountService} from "../../services/discount.service";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
 styleUrls:['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  book!:BookModel;

  email:string="";
  phone:string="";
  address:string="";
  discountCode:string="";
  discount!:any;

  constructor(private paymentService:PaymentService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private discountService:DiscountService
  ) {
  }

  ngOnInit() {
    this.checkData();
    setInterval(() => {
      this.checkData();
    }, 1000);
  }

  checkData(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.book = JSON.parse(params['book']);
    });
    if(!this.book){
      this.router.navigate(['/']);
    }
  }

  fullName: string = '';
  isDisabledBtn = true;
  isEmailValid!: string;
  isPhoneValid!: string;
  isAddressValid!: string;
  errMessage!: string;

  onEmailChange() {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (this.email === '') {
      this.isEmailValid = '';
      this.errMessage = '* Email không được để trống!';
    } else if (!this.email.match(pattern)) {
      this.isEmailValid = 'falseEmail';
      this.errMessage = '* Email không đúng định dạng!';
    } else {
      this.isEmailValid = 'trueEmail';
      this.errMessage = '';
    }
    this.checkAllFields();
  }
  errMessagePhone!: string;

  onPhoneChange() {
    let phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (this.phone === '') {
      this.isPhoneValid = '';
      this.errMessagePhone = '* Số điện thoại không được để trống!';
    } else if (!this.phone.match(phonePattern)) {
      this.isPhoneValid = 'falsePhone';
      this.errMessagePhone = '* Số điện thoại không hợp lệ!';
    } else {
      this.isPhoneValid = 'truePhone';
      this.errMessagePhone = '';
    }
    this.checkAllFields();
  }

  isFullNameValid!: string;
  errMessageFullName!: string;

  onFullNameChange() {
    if (this.fullName === '') {
      this.isFullNameValid = '';
      this.errMessageFullName = '* Không được để trống trường này!';
    } else {
      this.isFullNameValid = 'trueFullName';
      this.errMessageFullName = '';
    }
    this.checkAllFields();
  }
  errMessageAddress!: string;

  onAddressChange() {
    if (this.address === '') {
      this.isAddressValid = '';
      this.errMessageAddress = '* Không được để trống trường này!';
    } else {
      this.isAddressValid = 'trueAddress';
      this.errMessageAddress = '';
    }
    this.checkAllFields();
  }

  private checkAllFields() {
    this.isDisabledBtn = !(
      this.isEmailValid === 'trueEmail' &&
      this.isFullNameValid === 'trueFullName' &&
      this.isAddressValid === 'trueAddress' &&
      this.isPhoneValid === 'truePhone'
    );
  }
  handleCheckDiscount(){
    if(this.discountCode == "" || this.discountCode == null){
      console.log("Discount code is empty");
      return;
    }else{
      this.discountService.findDiscount(this.discountCode).subscribe({
        next: (res) => {
          this.discount = res;
          console.log("discount:", this.discount);
        },
        error: (err) => {
          console.log("Get discount failed: ", err);
        }
      })
    }
  }

  handlePayment(){
    const width = 1000;
    const height = 700;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    var totalPrice = this.discount ? this.book.price - ((this.discount?.amount * this.book.price) / 100): this.book.price;
    console.log("totalPrice: ", totalPrice);
    let bookPurchaseDTO = {
      bookId: this.book.bookId,
      email: this.email,
      phone_number: this.phone,
      full_name: this.fullName,
      delivery_address: this.address,
      discountId: this.discount?.discountId || undefined,
      total_price: totalPrice
    }
    console.log("bookPurchaseDTO: ", bookPurchaseDTO);
    this.paymentService.purchaseBook(bookPurchaseDTO).subscribe({
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
              // todo: popup thanh toán thành công, mã đơn hàng, text yêu cầu liên hệ khi cần tra cứu
              //  trạng thái vận chuyển
              this.router.navigate([`/`]);
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
  }}
