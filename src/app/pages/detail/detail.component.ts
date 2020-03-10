import { Observable, of } from 'rxjs';
import { IGitUserDetail } from './../../interfaces/user';
import { GitService } from './../../services/git.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public user$: Observable<IGitUserDetail>;

  constructor(private gitService: GitService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.gitService.getUserDetail(params.get('login')).pipe(
          catchError((err: HttpErrorResponse) => {
            if(err.status == 404) {
              this.router.navigate(['404']);
            }
            return of(null)
          })
        )
        )
    ); 
  }

}
