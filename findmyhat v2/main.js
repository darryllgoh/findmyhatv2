const prompt = require('prompt-sync')({sigint: true});

const clear = require('clear-screen');

//create global variables
const height = 10;
const width = 10;
const hat = '^';
const hole = 'O';
const pathCharacter = '*';
const fieldCharacter = '░';
const field = [[]];
let currCharRow = 0;
let currCharCol = 0;


//Create 2D array

function generateField() {

    for (let row = 0; row < height; row++) {

        field[row] = [];

        for (let col = 0; col < width; col++) {

            let prob = (Math.floor(Math.random() * 10));
            if (prob < 1) {
                field[row][col] = hole;
            }
            else {
                field[row][col] = fieldCharacter;     //randomize position of hole and field
            }
        }
    }


    field[currCharRow][currCharCol] = pathCharacter; //set character at (0, 0)

    let row = (Math.floor(Math.random() * 10));
    let col = (Math.floor(Math.random() * 10));
    field[row][col] = hat;  //randomize position of hat

}

//print in string form
function print() {

    clear();

    const displayString = field.map(row => {
        return row.join('');
    }).join('\n');
    console.log(displayString);
}

//prompt
function askQuestion() {
    
    const getInput = prompt("Which way? ").toLowerCase();

    //switch case
    
    switch (getInput) {
        case "u":
            currCharRow--;
            break;
        case "d":
            currCharRow++;
            break;
        case "l":
            currCharCol--;
            break;
        case "r":
            currCharCol++;
            break;
        default:
            console.log("Please enter u, d, l or r");
            break;
    }
}

function startGame() {

    let isPlaying = true;

    while (isPlaying) {

        print();
        askQuestion();
        
        if (currCharRow < 0 || currCharRow > 9 || currCharCol < 0 || currCharCol > 9) {

            console.log("Out of bounds - Game End!")
            isPlaying = false;

        } else if (field[currCharRow][currCharCol] == hole) {   
            
            console.log("Sorry, you fell down a hole");
            isPlaying = false;

        } else if (field[currCharRow][currCharCol] == hat) {
            
            console.log("Congrats, you found your hat!");
            isPlaying = false;

        } else {

            field[currCharRow][currCharCol] = pathCharacter;

        }
            
    }
}

generateField();

startGame();
