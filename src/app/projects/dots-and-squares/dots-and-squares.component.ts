import { Component, OnInit } from "@angular/core";

@Component({
  selector: "sm-dots-and-squares",
  templateUrl: "./dots-and-squares.component.html",
  styleUrls: ["./dots-and-squares.component.scss"]
})
export class DotsAndSquaresComponent implements OnInit {
  gameBoardSize = [1, 2, 3, 4, 5];
  gameBoardCells: any;
  currentPlayer = 'player1';
  player1Count = 0;
  player2Count = 0;
  totalCount = 0;
  gameIsFinished = false;

  constructor() {}

  ngOnInit() {
    this.gameBoardCells = document.getElementsByTagName('span');
    console.log(this.gameBoardCells);
  }

  clickBorder(cell1) {
    const x = cell1.offsetX;
    const y = cell1.offsetY;
    const cellWidth = 50;
    const id = cell1.target.id;
    const index = id.split('-');
    let cell2: any;

    if (x >= 0 && x <= cellWidth && y <= 0 && !cell1.target.classList.value.includes('top')) {
      cell1.target.classList.add("top");
      const row = parseInt(index[1], 10);
      const cell = index[0].toString();
      const prevRow = (row - 1).toString();
      cell2 = document.getElementById(cell + "-" + prevRow);
      if (row > 0 && !cell2.classList.value.includes('bottom')) {
        cell2.classList.add("bottom");
      }
    } else if (x <= 0 && y >= 0 && y <= cellWidth && !cell1.target.classList.value.includes('left')) {
      cell1.target.classList.add("left");
      const col = parseInt(index[0], 10);
      const row = index[1].toString();
      const prevCol = (col - 1).toString();
      cell2 = document.getElementById(prevCol + "-" + row);
      if (col > 0 && !cell2.classList.value.includes('right')) {
        cell2.classList.add("right");
      }
    } else if (x >= cellWidth && y >= 0 && y <= cellWidth && !cell1.target.classList.value.includes('right')) {
      cell1.target.classList.add("right");
      const col = parseInt(index[0], 10);
      const row = index[1].toString();
      const prevCol = (col + 1).toString();
      cell2 = document.getElementById(prevCol + "-" + row);
      if (col < 4 && !cell2.classList.value.includes('left')) {
        cell2.classList.add("left");
      }
    } else if (x >= 0 && x <= cellWidth && y >= cellWidth && !cell1.target.classList.value.includes('bottom')) {
      cell1.target.classList.add("bottom");
      const row = parseInt(index[1], 10);
      const cell = index[0].toString();
      const prevRow = (row + 1).toString();
      cell2 = document.getElementById(cell + "-" + prevRow);
      if (row < 4 && !cell2.classList.value.includes('top')) {
        cell2.classList.add("top");
      }
    } else {
      return;
    }
    if (this.checkSquareForAssignment(cell1, cell2)) {
      return;
    }
    if (this.totalCount === 25) {
      this.gameIsFinished = true;
      return;
    }
    this.currentPlayer === 'player1' ? this.currentPlayer = 'player2' : this.currentPlayer = 'player1';
  }

  styleBorders(i, j) {
    if (i === 0 && j === 0) {
      return { "border-top-width": "16px", "border-left-width": "16px" };
    } else if (i === 4 && j === 0) {
      return { "border-top-width": "16px", "border-right-width": "16px" };
    } else if (i === 0 && j === 4) {
      return { "border-bottom-width": "16px", "border-left-width": "16px" };
    } else if (i === 4 && j === 4) {
      return { "border-bottom-width": "16px", "border-right-width": "16px" };
    } else if (i === 0) {
      return { "border-left-width": "16px" };
    } else if (i === 4) {
      return { "border-right-width": "16px" };
    } else if (j === 0) {
      return { "border-top-width": "16px" };
    } else if (j === 4) {
      return { "border-bottom-width": "16px" };
    }
    return {};
  }

  checkSquareForAssignment(cell1, cell2) {
    const classesCell1 = cell1.target.classList.value;
    const classesCell2 = cell2 ? cell2.classList.value : null;
    let boxMarked = false;

    if (this.allBordersAreChecked(classesCell1)) {
      cell1.target.classList.add(this.currentPlayer);
      this.currentPlayer === 'player1' ? this.player1Count += 1 : this.player2Count += 1;
      this.totalCount += 1;
      boxMarked = true;
    }

    if (cell2 && this.allBordersAreChecked(classesCell2)) {
      cell2.classList.add(this.currentPlayer);
      this.currentPlayer === 'player1' ? this.player1Count += 1 : this.player2Count += 1;
      this.totalCount += 1;
      boxMarked = true;
    }
    return boxMarked;
  }

  allBordersAreChecked(cell): boolean {
    if (cell.includes('left') && cell.includes('right') && cell.includes('top') && cell.includes('bottom') && !cell.includes('player1') && !cell.includes('player2')) {
      return true;
    }
  }

  startNewGame() {
    this.gameIsFinished = false;
    this.player1Count = 0;
    this.player2Count = 0;
    this.totalCount = 0;
    this.currentPlayer = 'player1';
  }
}
