var score,
    turn = 'X',
    moves
    board = [['','',''],
             ['','',''],
             ['','','']];

function startGame()
{
    score = {
        'X': 0,
        'O': 0
    };
    moves = 0;
    turn = 'X';
    
    createCanvas();
}

function restartGame() {

    //grab all the cells
    var cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        //remove all the cells
        cell.remove()
    })
    //grab all the rows
    var rows = document.querySelectorAll('tr');
    rows.forEach(row => {
        //remove all the rows
        row.remove();
    })
    //reset the output
    var output = document.getElementById('output');
    output.innerHTML = '';
    //reset the board
    board = [['','',''],
             ['','',''],
             ['','','']];
    //reset the moves
    moves = 0;
    //recreate the canvas.
    createCanvas();
}

//create visual the tic, tac toe board
function createCanvas()
{
    //for tic,tac toe 3 sides.
    var side = 3;
    //the table
    var tbody = document.getElementById("tableBody");

    //loop
    for(var i = 0; i < side; i++)
    {
        var row = document.createElement('tr');
        for(var j = 0; j < side; j++)
        {
            //create 3 of whatever is in the loop..

            var cell = document.createElement('td');
            cell.className = 'cells';
            cell.innerHTML = ''; //put the inner html as the nothing
            cell.addEventListener('click', handleTurn,false)

            cell.id = i + "," + j
            //...then put everything into the row
            row.appendChild(cell);
        }   
        tbody.appendChild(row);
    }
}

function checkWin(){

    var doWin = false;

    if(moves == 9)
    {
        endGame();
    }
    else {
        var side = 3;
        var xWinArray = ['X','X','X'];
        var oWinArray = ['O','O','O'];
        var col0 = getCol(board,0);
        var col1 = getCol(board,1);
        var col2 = getCol(board,2);

        //top left to bottom right
        var dia1 = Array.from(board[0][0] + board[1][1] + board[2][2]);
        //top right to bottom left
        var dia2 = Array.from(board[2][0] + board[1][1] + board[0][2]);

        if(JSON.stringify(dia1) == JSON.stringify(xWinArray) || (JSON.stringify(dia1) == JSON.stringify(oWinArray)))
        {
            doWin = true;
        }
        
        if(JSON.stringify(dia2) == JSON.stringify(xWinArray) || (JSON.stringify(dia2) == JSON.stringify(oWinArray)))
        {doWin = true;}


        for(var i = 0; i < side; i++)
        {
            if(JSON.stringify(xWinArray) == JSON.stringify(board[i]) || JSON.stringify(oWinArray) == JSON.stringify(board[i]))
            {
                doWin = true;
            }

            switch(i){
                case 0:
                    if(JSON.stringify(xWinArray)==JSON.stringify(col0) || (JSON.stringify(oWinArray)==JSON.stringify(col0)))
                    {
                        doWin = true;
                    }
                    break;
                case 1:
                    if(JSON.stringify(xWinArray)==JSON.stringify(col1)|| (JSON.stringify(oWinArray)==JSON.stringify(col1)))
                    {
                        doWin = true;
                    }
                    break;
                case 2:
                    if(JSON.stringify(xWinArray)==JSON.stringify(col2) || (JSON.stringify(oWinArray)==JSON.stringify(col2)))
                    {   
                        doWin = true;
                    }
                    break;
            }
        }
        if(doWin)
        {return endGame()}
    }
}

function getCol(array, colNum){
    var col = [];
    for(var i = 0; i < array.length; i++)
    {
        col.push(array[i][colNum])
    }
    return col;
}


function endGame()
{
    //freeze all cells. if they are 'clicked', they cannot be clicked again.
    var cellsHTML = document.getElementsByClassName('cells');
    const cellsArray =  Array.from(cellsHTML);

    cellsArray.forEach(cell => cell.className = 'clicked')

    var output = document.getElementById('output');

    output.innerHTML = "<h3>Game over! " + turn + " has won! </h3>"
    output.innerHTML += "<button onclick='restartGame();'>Play again?</button><button>Exit</button>"
    return true;
}

function handleTurn(e){
    
    //if the button is clicked
    if(e.target.className == 'clicked')
    {
        //return as cannot more than once.
        return;
    }
    else
    {

        e.target.innerHTML = turn;

        e.target.className = 'clicked'

        var chars = e.target.id.split(',');

        console.log(chars);

        board[ chars[0] ] [ chars[1] ] = turn;

        moves += 1;
        if(!checkWin())
            turn = turn === 'X' ? 'O' : 'X';
    }
};

window.addEventListener('load',startGame);

