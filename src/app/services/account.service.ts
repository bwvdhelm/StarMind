import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  public uri = "http://localhost:8080";
  private loginStatus = new BehaviorSubject<boolean>(
    this.cookieService.get("loginStatus") === "1"
  );

  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  public registerUser(email, password) {
    const body = {
      email,
      password
    };
    return this.http.post<any>(`${this.uri}/user/register`, body).pipe(
      map(
        result => {
          return result;
        },
        error => {
          return error;
        }
      )
    );
  }

  public loginUser(email, password) {
    const body = {
      email,
      password
    };
    console.log(body);
    return this.http.post<any>(`${this.uri}/user/login`, body).pipe(
      map(
        result => {
          if (result && result.token) {
            const token = result.token;
            this.cookieService.delete("bearer");
            this.cookieService.set("bearer", token);
            this.cookieService.set("username", email);
            this.cookieService.set("loginStatus", "1");
            this.loginStatus.next(true);
            this.router.navigate(["/profile"]);
            return result;
          }
        },
        error => {
          return error;
        }
      )
    );
  }

  public logoutUser(): void {
    this.cookieService.delete("bearer");
    this.cookieService.delete("username");
    this.cookieService.set("loginStatus", "0");
    this.loginStatus.next(false);
    this.router.navigate(["/home"]);
    console.log("Logged out succesfully");
  }

  public getUser() {
    const token = this.cookieService.get("bearer");
    const username = this.cookieService.get("username");
    console.log('token and username:', token, username);
    return this.http
      .get<any>(`${this.uri}/user/${username}`, {
        headers: new HttpHeaders({ Authorization: `bearer ${token}` })
      })
      .pipe(
        map(
          result => {
            return result;
          },
          error => {
            return error;
          }
        )
      );
  }
}
