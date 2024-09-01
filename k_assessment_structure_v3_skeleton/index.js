const prompt = require("prompt-sync")({ sigint: true });

// Game elements/assets constants
const GRASS = "░";
const HOLE = "O";
const CARROT = "^";
const PLAYER = "*";
const OUTB = undefined;

// WIN / LOSE / OUT / QUIT messages constants
const WIN = "**************************************************\n You win - You found the carrot!";                                                                 // TODO: customise message when player wins
const LOST = "**************************************************\n You lost - You droppped into a hole!";                                                                // TODO: customise message when player lose
const OUT = "**************************************************\n You lost-You are out of boundary";                                                                 // TODO: customise message when player is out of bounds (lose)
const QUIT = "Game Ended."                                                      // TODO: customise message when player quits

const rows = 8;                                                                 // the game map will have 8 rows
const cols = 5;                                                                 // the game map will have 5 cols
const percentage = .2;                                                          // % of holes for the map


class Field {


    constructor(field = [[]]) {
        this.field = field;          //this.field is a property of the class Field
        this.gamePlay = false;          // starts as false before the game starts
        this.a = 0;
        this.b = 0;
    }


    static welcomeMsg(msg) {                                                     // static Method to show game's welcome message
        console.log(msg);
    }

    static generateField(rows, cols, percentage) {                              //static method that generates and return a 2Dmap
        // TODO:
        const map = [[]];
        for (let i = 0; i < rows; i++) {
            map[i] = [];
            for (let j = 0; j < cols; j++) {
                map[i][j] = Math.random() > percentage ? GRASS : HOLE;          //
            }

        }
        return map;
    }

    printField() {                                                               // print the game field (used to update during gameplay)       
        // TODO:
        this.field.forEach(element => {

            console.log(element.join(""));
        }
        )
    }

    updateGame(input) {                                                          // TODO: Refer to details in the method's codeblock

        const userInput = String(input).toLowerCase();

        switch (this.field[this.a][this.b]) {
            case HOLE:
                console.log(LOST);
                this.gamePlay = false;
                break;
            case CARROT:
                console.log(WIN);
                this.gamePlay = false;
                break;
            case GRASS:
                console.log('Keep looking for the hat...');
                this.field[this.a][this.b] = PLAYER;
                break;
            case PLAYER:
                console.log('You are stepping on *');
                break;
            case OUTB:
                this.gamePlay = false;
                console.log(OUT);
                break;
            }
       

       
            if (userInput === 'q') {
            this.quitGame();
        }

    }

    plantCarrot() {
        const X = Math.floor(Math.random() * (rows - 1) + 1);
        const Y = Math.floor(Math.random() * (cols - 1) + 1);
        this.field[X][Y] = CARROT;
    }

    startGame() {
        this.gamePlay = true;                           // set this.gamePlay = true; to keep the game running

        this.field[0][0] = PLAYER;

        this.plantCarrot();

        while (this.gamePlay) {

            this.printField();

            let flagInvalid = false;
            const input = prompt("**************************************************\nWhich Way:");       //obtain the user's direction ( up down left of right)
            console.log("(u)p, (d)own, (l)eft, (r)ight, (q)uit"); //provide instruction for player

            switch (input.toLowerCase()) {                         //feedback user's input
                case "u":
                    console.log("**************************************************\nYou moved up!");
                    this.a -= 1;
                    break;
                case "d":
                    console.log("**************************************************\nYou moved down!");
                    this.a += 1;
                    break;
                case "l":
                    console.log("**************************************************\nYou moved left");
                    this.b -=1;
                    break;
                case "r":
                    console.log("**************************************************\nYou moved right");
                    this.b +=1;
                    break;
                case "q":
                    console.log("**************************************************\nquit");

                    break;
                default:
                    console.log("**************************************************\nInvalid input");
                    flagInvalid = !flagInvalid;
                    break;
            }

            if (!flagInvalid) {
                this.updateGame(input);
            }

        }
    }

    endGame() {
        this.gamePlay = false;                                                  // set property gamePlay to false
        process.exit();                                                         //ends the node app
    }

    quitGame() {
        console.log(QUIT);
        this.endGame();
    }

}



// Instantiate a new instance of Field Class
const createField = Field.generateField(rows, cols, percentage);                //call Field's class static method to generate 2d field

const gameField = new Field(createField);

Field.welcomeMsg("Welcome to Find Your Hat!\n**************************************************\\n");

gameField.startGame();

