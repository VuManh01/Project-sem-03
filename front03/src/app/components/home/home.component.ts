import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {BookService} from "../../services/book.service";
import {BookModel} from "../../models/book.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private bookService:BookService) {
  }
  book!:BookModel;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.initDataBook();
  }

  initDataBook(){
    this.bookService.get1Book().subscribe({
      next: (res) => {
        this.book = res;
        console.log("bookdata:", this.book);
      },
      error: (err) => {
        console.log("Get book failed: ", err);
      }
    })
  }

  protected readonly JSON = JSON;
}
