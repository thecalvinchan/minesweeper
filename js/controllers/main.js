angular.module('minesweeper').controller('main',['$scope','board',
  function($scope,board) {
    $scope.grid = board.grid;
    $scope.mines = board.mines;
    $scope.total = board.total;
    $scope.revealed = 0;
    $scope.selectCell = function(row,col) {
      console.log(row + ' ' + col);
      if ($scope.grid[row][col].value == '*') {
        alert('gameover');
        exposeBoard($scope.grid);
      } else if ($scope.grid[row][col].value > 0) {
        $scope.grid[row][col].accessed = true;
        $scope.revealed++;
      } else {
        reveal($scope.grid,row,col,$scope);
      }
      if ($scope.total - $scope.mines == $scope.revealed) {
        alert('you win');
        exposeBoard($scope.grid);
      }
    };
  }
]);

function exposeBoard(grid) {
  for (var i=0; i<grid.length; i++) {
    for (var j=0; j<grid[i].length; j++) {
      grid[i][j].accessed = true;
    }
  }
}

function reveal(grid,row,col,scope) {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) {
    return;
  }
  if (grid[row][col].accessed || grid[row][col].value != 0) {
    return;
  }
  grid[row][col].accessed = true; 
  scope.revealed++;
  reveal(grid,row-1,col-1,scope);
  reveal(grid,row-1,col,scope);
  reveal(grid,row-1,col+1,scope);
  reveal(grid,row,col-1,scope);
  reveal(grid,row,col+1,scope);
  reveal(grid,row+1,col-1,scope);
  reveal(grid,row+1,col,scope);
  reveal(grid,row+1,col+1,scope);
}
