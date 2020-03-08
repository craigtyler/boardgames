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
                board[ cords[0] ] [ cords[1]] = 'rp';
                var checker = document.createElement('td');
                checker.className = "checkerRed";
                checker.id = cell.id
                checker.addEventListener('click',handleTurn,false);
                cell.appendChild(checker);
            }   
            else if(counter > 34)
            {
                board[ cords[0] ] [ cords[1] ] = 'bp';
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

    //make sure there are no glows before handling turn logic
    checkForGlows();

    var cords = this.id.split(',');

    var boardPos = board[ cords[0] ] [ cords[1] ];

    var glowLeft
    var glowRight
    var glowChecker
    
    if(boardPos != 'b')
    {
      var movement = this.className;
      var canMove = false;
      console.log(movement)
        switch(movement){
            case "checkerRed":
                
                var tempDown = parseInt(cords[0]) + 1;
                var tempLeft = parseInt(cords[1]) + 1;
                var tempRight = parseInt(cords[1]) - 1;
                
                if(board[tempDown][tempRight] == 'b')
                {
                    var tablePos = document.getElementById(tempDown+","+tempRight)
                    glowRight = document.createElement('td');
                    glowRight.className = 'selectedSq';
                    glowRight.addEventListener('click',moveChecker,false)
                    tablePos.appendChild(glowRight)
                    if(canMove != true && glowRight != undefined)
                        canMove = true;
                }
                
                if(board[tempDown][tempLeft] == 'b')
                {
                    var tablePos = document.getElementById(tempDown+","+tempLeft)
                    glowLeft = document.createElement('td');
                    glowLeft.className = 'selectedSq';
                    glowLeft.addEventListener('click',moveChecker,false)
                    tablePos.appendChild(glowLeft)
                    if(canMove != true && glowLeft != undefined)
                        canMove = true;
                }
               
                break;
            case "checkerBlack":
                console.log('move up');
                console.log('current Location is ' + cords)
                var tempUp = parseInt(cords[0]) - 1;
                var tempLeft = parseInt(cords[1]) - 1;
                var tempRight = parseInt(cords[1]) + 1;
                
                if(board[tempUp][tempRight] == 'b')
                {
                    console.log('do something')
                    var tablePos = document.getElementById(tempUp+","+tempRight)
                    glowRight = document.createElement('td');
                    glowRight.className = 'selectedSq';
                    glowRight.addEventListener('click',moveChecker,false)
                    tablePos.appendChild(glowRight)
                    if(canMove != true && glowRight != undefined)
                        canMove = true;
                }
                
                if(board[tempUp][tempLeft] == 'b')
                {
                    console.log('do something')
                     var tablePos = document.getElementById(tempUp+","+tempLeft)
                    glowLeft = document.createElement('td');
                    glowLeft.className = 'selectedSq';
                    glowLeft.addEventListener('click',moveChecker,false)
                    tablePos.appendChild(glowLeft)
                    if(canMove != true && glowLeft != undefined)
                        canMove = true;
                }
                console.log(tempUp)
                console.log(tempRight + 'L')
                console.log(tempLeft + 'R')
                //showAvaliableMoves(this)
                break;
            case "uncaught":
                console.log("uh oh");
                break;
        }
        if(canMove){
            //now that we've decided that we can move, lets actually move
            
            //first set the visuals
            glowChecker = document.createElement('td')
            glowChecker.className = 'selected';
            this.appendChild(glowChecker)
            
            //then move the checker piece to a location.
        }
    }
    
}

function moveChecker(e){
    //get getElementById/byclass for 'selected' checker
    //delete it, create a new checker at new location aka this location
    //update board accordingly
    checkForGlows();
}

function checkForGlows(){
    var checkerGlows = document.getElementsByClassName('selected');
    var checkerMoves = document.getElementsByClassName('selectedSq');
    
    //remove all glows on board.
    while(checkerMoves.length != 0)
    {
        checkerMoves[checkerMoves.length -1].remove();
    }
    
    while(checkerGlows.length != 0)
    {
        checkerGlows[checkerGlows.length -1].remove();
    }
}

/*
function showAvaliableMoves(checker) {
    //[x,y] for ref
    //!for red to move down, it is adding in the x column, moving right (if looking at board on 
    //red side) is negative in y and positive in y to move left

    //for black to move up, it is negative in x column, moving right positive in y, left negative in x

    //get the cords for the checker
    var cords = checker.id.split(',');

    //pull them from the board
    //check to see if the board has possible movements based on checkers current pos
    
    var tempGlow1; //glow for left
    var tempGlow2; //glow for right

    //first find out what color this piece is
    switch(checker.className){

        case 'checkerRed':

            //a, up, b left, c right, d, down
            var a = parseInt(cords[0]) + 1;
            var b = parseInt(cords[1]) - 1;
            var c = parseInt(cords[1]) + 1;
            

            console.log(a + " " + " " + b + " or " + c)

            if(posmove1 == 'b')
            {
                //create the glow for the clicked checker's next posible positions
                var pos = document.getElementById(String(a+","+b))
                if(pos != undefined)
                {
                    tempGlow1 = document.createElement('td');
                    tempGlow1.className = 'selectedSq';
                    pos.appendChild(tempGlow1);
                }
            }
            else{
                console.log('could not get')
            }
            if(posmove2 == 'b') 
            {
                //create the glow for the clicked checker's next posible positions
                var pos = document.getElementById(String(a+","+c))
                
                if(pos != undefined)
                {
                    tempGlow2 = document.createElement('td');
                    tempGlow2.className = 'selectedSq';
                    pos.appendChild(tempGlow2);
                }
            }
            else{
                console.log('could not get')
            }
            break;

        case 'checkerBlack':

            //a, down, b left, c right
            var a = parseInt(cords[0]) - 1;
            var b = parseInt(cords[1]) - 1;
            var c = parseInt(cords[1]) + 1;

            var posmove1 = board[ parseInt(cords[0]) - 1] [parseInt(cords[1]) + 1];
            var posmove2 = board[ parseInt(cords[0]) - 1] [parseInt(cords[1]) - 1];

            if( posmove1 == 'b')
            {
                //create the glow for the clicked checker's next posible positions
                var pos = document.getElementById(String(a+","+b))
                if(pos != null)
                {
                    tempGlow1 = document.createElement('td');
                    tempGlow1.className = 'selectedSq';
                    pos.appendChild(tempGlow1);
                }
            }
            
            if( posmove2 == 'b')
            {
                //create the glow for the clicked checker's next posible positions
                var pos = document.getElementById(String(a+","+c))
                if(pos != null)
                {
                    console.log(pos)
                    tempGlow2 = document.createElement('td');
                    tempGlow2.className = 'selectedSq';
                    pos.appendChild(tempGlow1);
                }
            }
            break;
    }
    
    console.log(tempGlow1 + "" + tempGlow2)

    //create the glow for the clicked checker
    if(tempGlow1 != undefined && tempGlow2 != undefined){
        var tempGlow = document.createElement('td');
        tempGlow.className = 'selected';
        checker.appendChild(tempGlow);
    }
}

function moveChecker(currentLocation, nextLocations) {




    in order for a checker to move, we must know where it is located
    and where the next location the player wishes to move.
        we also must know if avaliable locations are not habited by friendly checkers.
        we also must know if there are enemy checkers are habited in the next available 
         space, and allow the checker to skip over it, collecting a point.


}
*/
//can this checker, move up or down (or either way)?

window.addEventListener('load',startGame);
