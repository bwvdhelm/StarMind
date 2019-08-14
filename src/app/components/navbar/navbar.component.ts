import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public isMobile = false;
  public showMobileMenu = false;
  public isLoggedIn: boolean;
  public logoutObject: any;

  constructor(
    public breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.accountService.isLoggedIn.subscribe(
      res => {this.isLoggedIn = res;}
    );

    this.breakpointObserver
      .observe(["(min-width: 480px)"])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = false;
        } else {
          this.isMobile = true;
        }
      });
  }

  public openMenu(): void {
    if (!this.showMobileMenu) {
      window.setTimeout(() => {
        this.showMobileMenu = !this.showMobileMenu;
      }, 10);
    }
  }

  public closeMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  public logout() {
    this.logoutObject = this.accountService.logoutUser();
  }

}
