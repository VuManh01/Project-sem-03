import { Component, OnInit } from '@angular/core';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedbacks';

@Component({
  selector: 'app-vanilla',
  templateUrl: './vanilla.component.html',
  styleUrls: ['./vanilla.component.css']
})
export class VanillaComponent implements OnInit {
  feedbacks: Feedback[] = [];


  currentIndex = 0;

  get visibleFeedbacks() {
    return this.feedbacks.slice(this.currentIndex, this.currentIndex + 3);
  }

  nextFeedback() {
    if (this.currentIndex + 3 < this.feedbacks.length) {
      this.currentIndex += 3;
    }
  }

  prevFeedback() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 3;
    }
  }

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.feedbackService.getFeedbacks().subscribe(
      data => {
        this.feedbacks = data;
      },
      error => {
        console.error('Error fetching feedbacks', error);
      }
    );
  }


}
