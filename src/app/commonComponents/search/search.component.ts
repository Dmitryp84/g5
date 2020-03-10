import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {


  @Output() searchString = new BehaviorSubject<string>('');

  constructor() { }

  ngOnInit(): void {
  }

  search(value: string) {
    this.searchString.next(value)
  }

  ngOnDestroy(){
    this.searchString.complete();
  }
  

}
