import { GitService } from './../../services/git.service';
import { BlocksComponent } from './../blocks/blocks.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends BlocksComponent implements OnInit {

  constructor(public gitService: GitService) {
    super(gitService);
  }

  ngOnInit(): void {
  }

}
