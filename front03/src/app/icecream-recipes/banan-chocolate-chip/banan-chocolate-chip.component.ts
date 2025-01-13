import { Component } from '@angular/core';
import { Feedback } from '../vanilla/feedbacks';
import { FeedbackService } from '../vanilla/feedback.service';

@Component({
  selector: 'app-banan-chocolate-chip',
  templateUrl: './banan-chocolate-chip.component.html',
  styleUrls: ['./banan-chocolate-chip.component.css']
})
export class BananChocolateChipComponent {
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
