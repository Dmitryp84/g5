import { IGitUserResponse, IGitUser, IGitUserDetail } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  constructor(private http: HttpClient) { }

  getUsers(searchSting: string, page = 1, per_page = 20): Observable<IGitUser[]> {
    const url = `https://api.github.com/search/users?q=${searchSting}&page=${page}&per_page=${per_page}`;
    return this.http.get<IGitUserResponse>(url).pipe(map(data => data.items));
  }

  getUserDetail(userLogin: string): Observable<IGitUserDetail>{
    const url = `https://api.github.com/users/${userLogin}`;
    return this.http.get<IGitUserDetail>(url);
  }

}
