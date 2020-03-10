import { IUserResponse, IUser } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  constructor(private http: HttpClient) { }

  getUsers(searchSting: string, page = 1, per_page = 2): Observable<IUser[]> {
    const url = `https://api.github.com/search/users?q=${searchSting}&page=${page}&per_page=${per_page}`;
    return this.http.get<IUserResponse>(url).pipe(map(data => data.items));
  }
}
