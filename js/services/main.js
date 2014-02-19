angular.module('minesweeper').factory('board',[
  function() {
    var config = {
        rows : 9,
        cols : 10,
        mines: 5
    };
    var grid = generateGrid(config.rows,config.cols,config.mines);
    grid = processGrid(grid);
    for (var i=0; i<grid.length; i++) {
      for (var j=0; j<grid[i].length; j++) {
        grid[i][j] = {
          value : grid[i][j],
          accessed : false
        }
      }
    }
    //printGrid(grid);
    return {
      grid : grid,
      total : config.rows * config.cols,
      mines : config.mines
    }
  }
]);


function printGrid(grid) {
    for (var i=0;i<grid.length;i++) {
        console.log(grid[i].join(' '));
    }
}

function processGrid(grid) {
    for (var i=0;i<grid.length;i++) {
        for (var j=0;j<grid[i].length;j++) {
            if (grid[i][j] == '*') {
                continue;
            }
            var value = 0;
            for (var k=i-1;k<i+2;k++) {
                if (k<0 || k>=grid.length) {
                    continue;
                }
                for (var l=j-1;l<j+2;l++) {
                    if (l<0 || l>=grid[i].length) {
                        continue;
                    }
                    if (grid[k][l] == '*') {
                        value++;
                    }
                }
            }
            grid[i][j] = value;
        }
    }
    return grid;
}

function generateGrid(numRows,numCols,numMines) {
    var mines = randMines(numRows,numCols,numMines);
    var grid = [];
    for (var i=0;i<numCols;i++) {
        grid[i] = [];
        for (var j=0;j<numRows;j++) {
            grid[i][j] = ' ';
        }
    }
    for (var k=0;k<mines.length;k++) {
        grid[mines[k].col][mines[k].row] = '*';
    }
    return grid;
}

function randMines(numRows,numCols,numMines) {
    //return array
    var mines = [];
    for (var i=0;i<numMines;i++) {
        var row = Math.floor(Math.random()*numRows);
        var col = Math.floor(Math.random()*numCols);
        mines.push({
            row : row,
            col : col
        });
    }
    return mines;
}
