import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "../../services/payment.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  id!: number;
  constructor(private router:Router, private activatedRoute:ActivatedRoute,private auth:AuthService, private paymentService:PaymentService) {

  }
  email: string = '';
  password!: string;
  passwordAgain!: string;
  fullName: string = '';
  isDisabledBtn = true;
  isEmailValid!: string;
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
  isPwValid!: string;
  errMessagePw!: string;
  onPasswordChange() {
    let pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (this.password === '') {
      this.isPwValid = '';
      this.errMessagePw = '* Mật khẩu Không được để trống!';
    } else if (!this.password.match(pattern)) {
      this.isPwValid = 'falsePw';
      this.errMessagePw =
        '* Mật khẩu tối thiểu 8 ký tự, ít nhất 1 chữ cái và 1 số!';
    } else {
      this.isPwValid = 'truePw';
      this.errMessagePw = '';
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
  isPwAgainValid!: string;
  errMessagePwAgain!: string;
  onPasswordAgainChange() {
    let pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (this.passwordAgain === '') {
      this.isPwAgainValid = '';
      this.errMessagePwAgain = '* Không được để trống trường này!';
    } else if (this.passwordAgain !== this.password) {
      this.isPwAgainValid = 'falsePw';
      this.errMessagePwAgain =
        '* Mật khẩu không khớp!';
    } else {
      this.isPwAgainValid = 'truePw';
      this.errMessagePwAgain = '';
    }
    this.checkAllFields();
  }


  private checkAllFields() {
    this.isDisabledBtn = !(
      this.isEmailValid === 'trueEmail' &&
      this.isPwValid === 'truePw' &&
      this.isFullNameValid === 'trueFullName'
      && this.isPwAgainValid === 'truePw'
    );
  }

  checkId(id:number){
    console.log("Id:", id);
    if(!id){
      this.router.navigate(['/']);
    }
    this.paymentService.checkMembership(id).subscribe({
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

  handleSignUp(){
    this.auth.register({email: this.email, password: this.password, fullName:this.fullName, orderId: this.id}).subscribe({
      next: res =>{
        console.log("Regis success: ", res);
        this.auth.login({email: this.email, password: this.password}).subscribe({
          next: res =>{
            console.log("Login success: ", res);
            this.router.navigate(['/']);
          },
          error: err =>{
            console.log("Login failed: ", err);
          }
        })
      },
      error: err =>{
        console.log("Regis failed: ", err);
      }
    })
  }

}
