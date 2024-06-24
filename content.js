// Queen solving script

const SQUARES = 10; //number of rows, columns, queens, unique colors
var color = [];
var grid = document.getElementById('queens-grid');
var t_grid = [];
var colArr = [];

for (var i = 0; i < SQUARES; i++) {
    //initialize 10 colors, since we can't have
    //more colors than rows
    //var temp = "" + i
    //color.push(grid.getElementsByClassName("cell-color-" + temp));
    color.push([]);
    t_grid.push([]);
}

console.log(color)

var children = grid.children;
for (var i = 0; i < children.length; i++) {
    var k = Math.floor(i / 10);
    for (var j = 0; j < children[i].classList.length; j++) {
        if (children[i].classList[j].match(/^cell-color-/)) {
            t_grid[k].push(parseInt(children[i].classList[j].slice(-1)));
        }
    }
}

for (var i = 0; i < SQUARES; i++) {
    for (var j = 0; j < SQUARES; j++) {
        console.log(parseInt(t_grid[i][j]))
        color[parseInt(t_grid[i][j])].push([i,j]);
    }
}

// tested and saw it works as intended to get the board
// color is the array of the different colors
// t_grid is the grid of every row
// colArr is the array of every color that is in use. Will change often.

console.log(t_grid);
console.log("======================");
console.log(color);


//solver code

// CREDIT: Most of my N-Queens solver code is based on this site
// https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/
// The thing I wrote is the isSafe() code

// We'll say a Queen is -1

function isSafe(board, row, col) {
    
    let c = t_grid[row][col];
    // rows and columns check
    for (var i = 0; i < SQUARES; i++) {
        if (board[row][i] == -1  || board[i][col] == -1) {
            // this is assuming that the queen isn't put there yet
            return false;
        }
    }

    // Touching check
    for (i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            
            if (row + i < 0 || col + i < 0) {
                continue;
            }
            if (row + i > 9 || col + i > 9) {
                continue;
            }
            if (board[row + i][col + i] == -1) {
                return false;
            }
        }
    }

    // Same color check 
    for (var i = 0; i < color[c].length; i++) {
        if (board[color[c][i][0]][color[c][i][1]] == -1) {
            return false;
        }
    }
    
    return true;

}

function solverHelp(board, col) {
    // base case: If all queens are placed
    // then return true
    if(col >= SQUARES) {
        return true;
    }
    // Consider this column and try placing
    // this queen in all rows one by one
    for(let i = 0; i < SQUARES; i++){
 
        if(isSafe(board, i, col)==true){
             
            // Place this queen in board[i][col]
            board[i][col] = -1
 
            // recur to place rest of the queens
            if(solverHelp(board, col + 1) == true)
                return true
 
            // If placing queen in board[i][col
            // doesn't lead to a solution, then
            // queen from board[i][col]
            board[i][col] = t_grid[i][col];
        }
    }
    // if the queen can not be placed in any row in
    // this column col then return false
    return false
}

function solver() {
    // sketch of how to do this:
    // rules says 1 in every column, row, and color
    // cannot be touching each other

    // we can use a backtracing algorithm that ignores diagnals
    // and instead checks in our list

    let board = c_grid;
 
    if(solverHelp(c_grid, 0) == false){
        console.log("Error: Solution does not exist");
        return false;
    }
 
    console.log("SOLVED BOARD");
    console.log(board);
    return true;

}

solver();