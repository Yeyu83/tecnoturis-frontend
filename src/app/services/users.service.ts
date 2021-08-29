import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  public login(user: User): Observable<User> {
    const params = new HttpParams().set('name', user.name).set('password', user.password)
    return this.http.get<User>('http://localhost:3000/user', { params })
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/user', user)
  }
}
