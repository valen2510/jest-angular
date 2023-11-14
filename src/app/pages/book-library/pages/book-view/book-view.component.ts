import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit{

  constructor(private activeRouter: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((param) => {
      console.log(param)
    })
  }
}
