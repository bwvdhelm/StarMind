import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'sm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isMobile = false;
  public showMobileMenu = false;

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver
    .observe(['(min-width: 480px)'])
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

  public log() {
    console.log('blurred');
  }

}
