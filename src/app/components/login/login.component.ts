import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginObject: any;
  public registerObject: any;

  constructor(
    private accountService: AccountService
    ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  public login() {
    this.loginObject = this.accountService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(result => {
      return result
    });
  }

  public register() {
    this.registerObject = this.accountService.registerUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(result => {
      return result
    });
  }
}
