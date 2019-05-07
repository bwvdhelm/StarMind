import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sm-dots-and-squares',
  templateUrl: './dots-and-squares.component.html',
  styleUrls: ['./dots-and-squares.component.scss']
})
export class DotsAndSquaresComponent implements OnInit {

  gameBoardSize = [1, 2, 3, 4, 5];


  constructor() { }

  ngOnInit() {
  }

  logEvent(event, cell) {
    const x = event.offsetX;
    const y = event.offsetY;
    const borderWidth = 5;
    const allowedSize = 45;
    if (x > -borderWidth && x < borderWidth && y > borderWidth && y < allowedSize) {
      console.log("left border clicked");
    } else if (y > -borderWidth && y < borderWidth && x > borderWidth && x < allowedSize) {
      console.log("top border clicked")
    } else if (y > borderWidth && y < allowedSize && x > allowedSize && x < 55) {
      console.log("right border clicked");
    } else if (x > borderWidth && x < allowedSize && y > allowedSize && y < 55) {
      console.log("bottom border clicked");
    }
    console.log(cell);
    const tdList = document.getElementsByTagName("td");
    console.log(tdList);
  }

}
