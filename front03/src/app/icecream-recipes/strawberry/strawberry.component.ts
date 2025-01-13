import { Component } from '@angular/core';
import { FeedbackService } from '../vanilla/feedback.service';
import { Feedback } from '../vanilla/feedbacks';

@Component({
  selector: 'app-strawberry',
  templateUrl: './strawberry.component.html',
  styleUrls: ['./strawberry.component.css']
})
export class StrawberryComponent {
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
