var turn = 'black',
    bCaptures,
    rCaptures
    board = [['','','','','','','','','',''],
             ['','','','','','','','','',''],
             ['','','','','','','','','',''],
             ['','','','','','','','','',''],
             ['','','','','','','','','',''],
             ['','','','','','','','','',''],
             ['','','','','','','','','',''],
             ['','','','','','','','','',''],
             ['','','','','','','','','',''],
             ['','','','','','','','','','']
            ];

function startGame(){
    createCanvas();
    createAndPlacePieces();
}

//aka create board
function createCanvas(){

    var side = 10;
    var colorBlackRow = true;
    var colorBlackCell;
    var tbody = document.getElementById("tableBody");


    for(var i = 0; i < side; i++)
    {
        var row = document.createElement('tr');
        //for each new row, alternate the color...
        colorBlackRow = !colorBlackRow

        for(var j = 0; j < side; j++)
        {
            //.. and on the first iteration of the new row..
            if(j == 0)
            {
                //..set the cell color to the new row color
                colorBlackCell = colorBlackRow;
            }

            var cell = document.createElement('td');

            cell.innerHTML = ''
            cell.id = i + "," + j

            if(colorBlackCell == true)
            {
                cell.className = 'black';
                //cell.innerHTML = '<img src=./img/blacksq.png>'
            }
            else if(colorBlackCell == false)
            {
                //cell.innerHTML = '<img src=./img/redsq.png>'
                cell.className = 'red';
            }
            //once we have drawn the color, flip to the next color
            colorBlackCell = !colorBlackCell

            row.appendChild(cell);
        }   
        tbody.appendChild(row);
    }
}
//create a overlay board, for pieces on the black cells. 
// 'b' is blank, 'bp' is black piece, 'rp' is red piece
function createAndPlacePieces() {

    var cells = document.querySelectorAll('td');

    var counter = 0;

    cells.forEach(cell => {

        var cords = cell.id.split(',');
        //console.log(cords);
        if(cell.className == 'black')
        {
            //init the first 3 rows of the board 
            if(counter < 15)
            {
                board[ cords[0] ] [ cords[1]] = 'bp';
                var checker = document.createElement('td');
                checker.className = "checkerRed";
                checker.id = cell.id
                checker.addEventListener('click',handleTurn,false);
                cell.appendChild(checker);
            }   
            else if(counter > 34)
            {
                board[ cords[0] ] [ cords[1] ] = 'rp';
                var checker = document.createElement('td');
                checker.className = "checkerBlack";
                checker.id = cell.id
                checker.addEventListener('click',handleTurn,false);
                cell.appendChild(checker);
            }
            else{
                board[ cords[0] ] [ cords[1] ] = 'b';
                var overlayBoard = document.createElement('td');
                overlayBoard.id = cell.id;
                overlayBoard.addEventListener('click',handleTurn,false);
                cell.appendChild(overlayBoard)
            }
            counter++;
        }
    })
    console.log(board);
}

function handleTurn(e) {

    var cords = this.id.split(',');

    if(board[ cords[0] ] [ cords[1] ] != 'b')
    {
        var movement = checkState(this.className);

        //use the checkstate helper to decide if we should move or not.

        switch(movement){
            case "moveDown":
                console.log('moving down');
                () =>{
                    var picked = false
                }
                break;
            case "moveUp":
                console.log('move up');
                break;
            case "uncaught":
                console.log("uh oh");
                break;
        }
    }
}

function moveChecker(movement, location) {

/*
    in order for a checker to move, we must know where it is located
    and where the next location the player wishes to move.
        we also must know if avaliable locations are not habited by friendly checkers.
        we also must know if there are enemy checkers are habited in the next available 
         space, and allow the checker to skip over it, collecting a point.
*/

}

//can this checker, move up or down (or either way)?
function checkState(checker) {
    
    if(checker == 'checkerRed')
    {
        return "moveDown";
    }
    else if(checker == 'checkerBlack')
    {
        return "moveUp";
    }
    else{
        return "uncaught";
    }
}

window.addEventListener('load',startGame);
