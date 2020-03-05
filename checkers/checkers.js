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
                cell.innerHTML = '<img src=./img/blacksq.png>'
            }
            else if(colorBlackCell == false)
            {
                cell.innerHTML = '<img src=./img/redsq.png>'
                cell.className = 'red';
            }
            //once we have drawn the color, flip to the next color
            colorBlackCell = !colorBlackCell

            row.appendChild(cell);
        }   
        tbody.appendChild(row);
    }
}

function createAndPlacePieces() {

    var cells = document.querySelectorAll('td');

    var counter = 0;

    cells.forEach(cell => {
        var cords = cell.id.split(',');
        //console.log(cords);
        if(cell.className == 'black')
        {
            if(counter < 15)
            {
                board[ cords[0] ] [ cords[1]] = 'black';
            }
            if(counter > 35)
            {
                board[ cords[0] ] [ cords[1] ] = 'red';
            }
            counter++;
        }
    })
    console.log(board);
}

function handleTurn() {

}

window.addEventListener('load',startGame);
