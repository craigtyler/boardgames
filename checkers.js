var turn = 'black',
    bCaptures,
    rCaptures;

function startGame(){
    createCanvas();
    createAndPlacePieces();
}


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

            cell.addEventListener('click', handleTurn,false)

            if(colorBlackCell == true)
            {
                cell.className = 'black';
            }
            else if(colorBlackCell == false)
            {
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
        if(cell.className == 'black')
        {
            if(counter < 15)
            {
                checker = createElement('td');
                checker.className = 'checker';
                cell.appendChild(checker);
            }
            if(counter > 35)
            {

            }
            counter++;
        }
    })
}

function handleTurn() {

}

window.addEventListener('load',startGame);
