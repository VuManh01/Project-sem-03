import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {FeedbackService} from "../../services/feedback.service";
import Swal from "sweetalert2";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor(private router: Router,
              private feedbackService: FeedbackService,
              private loadingService:LoadingService) {
  }

  email: string = '';
  title: string = '';
  content: string = '';
  fullname: string = '';
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  textMessageErr: string = '';

  handleSendFeedback() {
    console.log(this.email, this.title, this.content, this.fullname);
    if(this.email != '' && this.title!= '' && this.content!= '' && this.fullname!= '') {
      // send feedback
      this.loadingService.setGlobalLoading(true);
      this.feedbackService.sendFeedback(this.fullname, this.email, this.title, this.content).subscribe(
        (res) => {
          this.loadingService.setGlobalLoading(false);
          Swal.fire({
            title: "Thank you!",
            text: "Thanks your feedback!",
            icon: "success"
          });
        },
        (err) => {
          this.loadingService.setGlobalLoading(false);
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again later.",
          });
        }
      );
      return;
    }
    this.textMessageErr = 'Please fill in all fields';
    console.log('Please fill in all fields');
  }

  onInputChange(){
    this.textMessageErr = '';
  }

}
