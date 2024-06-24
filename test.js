// Using #54
// https://cdn.discordapp.com/attachments/748843959945789453/1254596650907729982/image.png?ex=667a11ae&is=6678c02e&hm=165e12594bea622864a7166f1cb57f623d6606d8edfc8abf3b67baf97f6b3056&

// var t_grid = [
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [1, 3, 3, 3, 2, 2, 2, 2, 2, 0],
//     [1, 3, 6, 6, 6, 6, 5, 4, 2, 0],
//     [1, 3, 6, 7, 7, 7, 5, 4, 2, 0],
//     [1, 3, 6, 8, 8, 7, 5, 4, 2, 0],
//     [1, 3, 6, 8, 9, 7, 5, 4, 2, 0],
//     [1, 3, 9, 9, 9, 7, 5, 4, 2, 0],
//     [1, 5, 5, 5, 5, 5, 5, 4, 2, 0],
//     [1, 4, 4, 4, 4, 4, 4, 4, 2, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];

var t_grid = [] // where test grid goes

var c_grid = structuredClone(t_grid);

const SQUARES = 10; //number of rows, columns, queens, unique colors
// var color = [
//     [[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9],[8,9],[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9]],
//     [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0]],
//     [[1,4],[1,5],[1,6],[1,7],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],[8,8]],
//     [[1,1],[1,2],[1,3],[2,1],[3,1],[4,1],[5,1],[6,1]],
//     [[2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7]],
//     [[2,6],[3,6],[4,6],[5,6],[6,6],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],
//     [[2,2],[2,3],[2,4],[2,5],[3,2],[4,2],[5,2]],
//     [[3,3],[3,4],[3,5],[4,5],[5,5],[6,5]],
//     [[4,3],[4,4],[5,3]],
//     [[5,4],[6,2],[6,3],[6,4]]
// ];

var color = [];
var colArr = [];


for (var i = 0; i < SQUARES; i++) {
    for (var j = 0; j < SQUARES; j++) {
        color[t_grid[i][j]].push([i,j]);
    }
}


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
            
            if (row + i < 0 || col + j < 0) {
                continue;
            }
            if (row + i > 9 || col + j > 9) {
                continue;
            }
            if (board[row + i][col + j] == -1) {
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
 
    console.log(board);
    return true;

}

solver();