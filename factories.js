import { randomShip, arrInclude } from './utility.js';

export const Ship = (typeLength) => {
    const health = Array(typeLength).fill(false);
    const hit = (index) => {
       health[index] = true;
    }
    const isSunk = () => {
        return health.every(el => el === true);
    }
    const reset = () => {
        for(let i = 0; i < typeLength; i++) {
            health[i] = false;
        }
    }
    return { health, hit, typeLength, isSunk, reset }
}

export const Gameboard = () => {
    //every board has set ships, which we will specify below (by their length)
    const ships = {
        5: Ship(5),
        4: Ship(4),
        3: Ship(3),
        2: Ship(2),
        1: Ship(1)
    }

    let positions = {}; //will contain pairs of coordinates in subarrays (nested objects) like [x,y]
    let attacks = {
        mis: [],
        hit: []
    }
    let seeds = []; //will contain our basic seed info for each ship (length, start x/y, directionStr)
    const positionCoordinates = []; //an array containing just the coords we are using, how does it differ
    //from positions though?

    const receiveAttack = (x, y) => {
        if(positions[x] == null || positions[x][y] == null) {
            attacks.mis.push([x, y]);
            return false;
        } 
        //in case of hit:
        const toHit = positions[x][y];
        attacks.hit.push([x, y]);
        ships[toHit.length].hit(toHit.index); //accesses the ship we are targeting, hits it.
        return true;
    }

    const missedAttacks = () => attacks.mis;

    const allSunk = () => {
        const keys = Object.keys(ships);
        for(let i = 0; keys.length > i; i += 1) {
            if(ships[keys[i]].isSunk() === false) { //if a ship is not sunk, return false
                return false;
            }
        }
        return true; //otherwise if all are, return true
    }

    const createCoord = (typeLength, x, y, direction) => {
        //should create the coordinates for the given (singular) ship.
        //will return an array of all the coords for a ship....and do what with them?
        const { length } = ships[typeLength];
        const coords = [];
        if (direction === 'v') {
            for (let i = 0; length > i; i += 1) { //for the length of the ship, create coords 
              if (x >= 10 || y + i >= 10) { //if oob, return null
                return null;
              }
              if (positions[x] != null && positions[x][y + i] != null) { //if already exists in positions, return null
                return null;
              }
              coords.push({ x, y: y + i }); //otherwise, push coord (vertical) to coords.
              //since we are vertical, x doesn't change. But y goes up from starting point.
            }
            return coords;
          }
          if (direction === 'h') {
            for (let i = 0; length > i; i += 1) {
              if (x + i >= 10 || y >= 10) {
                return null;
              }
              if (positions[x + i] != null && positions[x + i][y] != null) {
                return null;
              }
              coords.push({ x: x + i, y });
            }
            return coords;
          }
          return null; //if direction is anything but 'v' or 'h', return null.
    }
    
    const setPosition = (shipToSet, coords) => { //this function takes coords previously set, and
        //inputs them into positions object along with the corresponding ship data
        if(coords == null) return null;
        for(let i = 0; coords.length > i; i += 1) { //for each ship coord (grid location)
            if(positions[coords[i].x] == null) { //if not already set,
                positions[coords[i].x] = {};    //create a nested object at x position
            }
            const location = { typeLength: shipToSet, index: i }; //object containing ship length(identifier) and index of ship in ships
            positions[coords[i].x][coords[i].y] = location; 
        }
        return 1; //this value will tell our createBoard function to end the do/while
    }
    const createBoard = () => {
        //driver method...combines our various elements in gameboard to initalize the gameboard
        const keys = Object.keys(ships);
        for(let i = 0; i < keys.length; i++) {
            let returned = null;
            let coordinates = null;
            let seed = null;
            do {
                const { X, Y , directionStr } = randomShip();
                //testing
                //console.log(`x: ${X}, y: ${Y}, direction: ${directionStr}`);
                seed = [X, Y, keys[i], directionStr];
                coordinates = createCoord(keys[i], X, Y, directionStr);
                returned = setPosition(keys[i], coordinates);
                //console.log(`Returned: ${returned}`);
            } while (returned !== 1);
            positionCoordinates.push(...coordinates);
            seeds.push(seed);
        }
    }
    createBoard(); //auto init

    const reset = () => {
        positions = {};
        positionCoordinates.length = 0;
        seeds.length = 0;
        attacks = {
        mis: [],
        hit: [],
        };
        createBoard();
        const keys = Object.keys(ship);
        for (let i = 0; keys.length > i; i += 1) { //reset ships here too.
            ships[keys[i]].reset();
          }
    };

    return { positions, ships, positionCoordinates, seeds, receiveAttack, missedAttacks, allSunk, reset };
}//end gameboard

export const Player = (name, computer) => {
    const shots = []; //holds attempts
    const gameBoard = Gameboard(); //may need to refactor b/c of this
    
    function shot(xCoord, yCoord) {
        let x = xCoord;
        let y = yCoord;
        let arr = null;
        if(computer) {
            do {    //if computer, x and y are randomly generated for shots. 
                x = Math.floor(Math.random() * (9 - 0 + 1)) + 0; //(max - min) + min
                y = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
                arr = [x, y]; //pack their shot in an array
            } while(arrInclude(shots, arr) === true); //if the random array shot already exists, retry.
        } else {
            if(xCoord == null) return null;
            arr = [x, y];
            if(arrInclude(shots, arr)) {
                return null; //if shot is already taken, return null
            }
        }
        shots.push([x, y]); //push the shot.
        return { x: arr[0], y: arr[1] }; //return the shot.
    }

    function reset() {
        shots.length = 0;
        gameBoard.reset();
    }

    return { name, shot, shots, gameBoard, reset };
}
