import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isShow: boolean;
  constructor() { }

  ngOnInit() {
  }
  toggle() {
    this.isShow = !this.isShow;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    console.log(window);
    if (window.scrollY > 52) {
        document.getElementById('header_bot').classList.add('sticky');
      } else {
        document.getElementById('header_bot').classList.remove('sticky');
      }
  }
}
