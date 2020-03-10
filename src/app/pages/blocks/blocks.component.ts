import { IGitUser } from './../../interfaces/user';
import { GitService } from './../../services/git.service';
import { SearchComponent } from './../../commonComponents/search/search.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { 
  filter,
  distinctUntilChanged,
  switchMap,
 } from 'rxjs/operators';
 import { Observable } from 'rxjs';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit, AfterViewInit {

  @ViewChild("searchEll") search: SearchComponent;
  
  public users$: Observable<IGitUser[]>

  constructor(public gitService: GitService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.users$ = this.search.searchString.pipe(
      filter(data => data.length > 3),
      distinctUntilChanged(),
      switchMap(data => this.gitService.getUsers(data))
      )
  }

}
