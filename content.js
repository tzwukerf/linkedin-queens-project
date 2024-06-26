//TODO:
// DONE: resume and start are both the same buttons - make it so that it clicks start (can only click resume)
// LOW: maybe? maybe have this as an option - make it so that after completion it deletes the tab
// DONE: with the mistaken queen - make it so that after completion it doesn't click again and screws everything over (there is an enabled disable tag somewhere)
// DONE using storage untested - make communication with background work
// DONE: - make it so the set timeout isnt hard coded and instead runs whne loaded
// DONE UNTESTED: - make it so that that option for how long to wait until solve
// DONE UNTESTED: make the button mode work


document.addEventListener("DOMContentLoaded", loadedEvent);

var auto;

console.log("benchmark")
loadedEvent();

function loadedEvent() {
    var secondsToWait;
    var resume = document.getElementsByTagName('button');
    console.log("BUTTONS: ")
    console.log(resume);
    resume[11].click();
    
    chrome.storage.sync.get(["mode"]).then((result_mode) => {

        auto = result_mode.mode;


        chrome.storage.sync.get(["p_secs"]).then((result) => {
            secondsToWait = result.p_secs;
            console.log("Value is " + result.p_secs);

            console.log("IN LOADED EVENT CONTENT SECONDS TO WAIT")
            console.log(secondsToWait);

            if (secondsToWait) {
                setTimeout(outerWrapper, secondsToWait * 1000);
            } else { // undefined or 0 case
                setTimeout(outerWrapper, 0);
            }
        });
    });



}


// Queen solving script

function outerWrapper() { //no sleep in javascript

    let color = [];
    let grid = document.getElementById('queens-grid');

    let SQUARES = Math.sqrt(grid.children.length); //number of rows, columns, queens, unique colors
    let t_grid = [];

    for (let i = 0; i < SQUARES; i++) {
        //initialize 10 colors, since we can't have
        //more colors than rows
        //var temp = "" + i
        //color.push(grid.getElementsByClassName("cell-color-" + temp));
        color.push([]);
        t_grid.push([]);
    }

    let children = grid.children;
    for (let i = 0; i < children.length; i++) {
        let k = Math.floor(i / SQUARES);
        for (let j = 0; j < children[i].classList.length; j++) {
            if (children[i].classList[j].match(/^cell-color-/)) {
                console.log(parseInt(children[i].classList[j].slice(-1)))
                t_grid[k].push(parseInt(children[i].classList[j].slice(-1)));
            }
        }
    }

    for (let i = 0; i < SQUARES; i++) {
        for (let j = 0; j < SQUARES; j++) {
            color[t_grid[i][j]].push([i, j]);
        }
    }

    let c_grid = structuredClone(t_grid);

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
        for (let i = 0; i < SQUARES; i++) {
            if (board[row][i] == -1 || board[i][col] == -1) {
                // this is assuming that the queen isn't put there yet
                return false;
            }
        }

        // Touching check
        for (i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {

                if (row + i < 0 || col + j < 0) {
                    continue;
                }
                if (row + i > SQUARES - 1 || col + j > SQUARES - 1) {
                    continue;
                }
                if (board[row + i][col + j] == -1) {
                    return false;
                }
            }
        }

        // Same color check 
        for (let i = 0; i < color[c].length; i++) {
            if (board[color[c][i][0]][color[c][i][1]] == -1) {
                return false;
            }
        }

        return true;

    }

    function solverHelp(board, col) {
        // base case: If all queens are placed
        // then return true
        if (col >= SQUARES) {
            return true;
        }
        // Consider this column and try placing
        // this queen in all rows one by one
        for (let i = 0; i < SQUARES; i++) {

            if (isSafe(board, i, col) == true) {

                // Place this queen in board[i][col]
                board[i][col] = -1

                // recur to place rest of the queens
                if (solverHelp(board, col + 1) == true)
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

        if (solverHelp(c_grid, 0) == false) {
            console.log("Error: Solution does not exist");
            return false;
        }

        console.log(board);
        return board;

    }

    // code to get it onto linkedin

    let s_grid = solver();
    
    console.log("auto content")
    console.log(auto);


    function solveScript() {
        for (let i = 0; i < SQUARES * SQUARES; i++) {
            let j = Math.floor(i / SQUARES);
            let k = i % SQUARES;

            function triggerMouseEvent(node, eventType) {
                var clickEvent = new Event(eventType, {
                    bubbles: true,
                    cancelable: true
                });
                node.dispatchEvent(clickEvent);
            }

            let test = document.querySelector(".queens-cell");
            console.log("TEST");
            console.log(test);
            let square_elem = document.querySelector('div[data-cell-idx="' + i + '"]');
            console.log("SQUARE ELEM " + i + ": ");
            console.log(square_elem);

            // Taken from this Stack Overflow Comment: https://stackoverflow.com/a/24026594

            square_elem.onmousedown = function () {
                console.log("User moused down on cell " + i);
                return true; // Not needed, as long as you don't return false
            };

            if (square_elem) {
                //--- Simulate a natural mouse-click sequence.

                if (s_grid[j][k] == -1) {
                    if (square_elem.children[0].getElementsByClassName("cell-input").length > 0) { // cell-content's children bigger than 0
                        if (square_elem.children[0].getElementsByClassName("cell-input--cross").length > 0) {
                            triggerMouseEvent(square_elem, "mouseover");
                            triggerMouseEvent(square_elem, "mousedown");
                            triggerMouseEvent(square_elem, "mouseup");
                        }
                        continue;
                    }


                    triggerMouseEvent(square_elem, "mouseover");
                    triggerMouseEvent(square_elem, "mousedown");
                    triggerMouseEvent(square_elem, "mouseup");

                    triggerMouseEvent(square_elem, "mouseover");
                    triggerMouseEvent(square_elem, "mousedown");
                    triggerMouseEvent(square_elem, "mouseup");
                } else {
                    if (square_elem.children[0].getElementsByClassName("cell-input--queen").length > 0) {
                        //if someone were to have a mistaken queen

                        triggerMouseEvent(square_elem, "mouseover");
                        triggerMouseEvent(square_elem, "mousedown");
                        triggerMouseEvent(square_elem, "mouseup");
                    }
                }

            }
            else
                console.log("*** Target node not found! Contact the developer at tzwukerf@gmail.com");


        }
    }


    if (auto) {
        solveScript();
    } else {
        console.log("in button code")
        //TODO:
        // - button code, which doesn't work yet
        let toolbar = document.getElementsByClassName("pr-game-web__aux-controls")[0];
        let solveButton = document.createElement("button");
        // artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view aux-controls-btn
            
        solveButton.setAttribute("class", "artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--secondary ember-view aux-controls-btn");
        solveButton.setAttribute("id", "auto-off-button");
        solveButton.setAttribute("data-aux-btn", "solve");
        solveButton.setAttribute("type", "button");

        let temp_span = document.createElement("span");
        temp_span.setAttribute("class", "artdeco-button__text");
        temp_span.innerHTML = "Solve";

        solveButton.append(temp_span);
        toolbar.append(solveButton);
        toolbar.insertBefore(solveButton, toolbar.firstChild);

        solveButton.onclick = function() {
            solveScript();
        }
    }
}