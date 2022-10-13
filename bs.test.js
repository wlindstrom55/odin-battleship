//import * as BS from "./battleship.js";
import * as F from "./factories.js";

//ship tests
test('Create a new ship and check the parameters, test hit', () => {
    let newShip = F.Ship(3);
    //console.log(newShip.typeLength); //3
    expect(newShip.health).toEqual([false,false,false]);
    expect(newShip.isSunk()).toBe(false);
    newShip.hit(0);
    newShip.hit(1);
    expect(newShip.health).toEqual([true, true, false]);
    expect(newShip.isSunk()).toEqual(false);
    newShip.hit(2);
    expect(newShip.isSunk()).toEqual(true);
});

//gameboard tests - test functions of the gameboard grid mostly.

test('Create a new gameboard and check grid initalization', () => {
    let tgb = F.Gameboard();
    //expect(tgb.grid[0][8]).toBe(false); //old
    console.log(tgb.seeds);
    //what kinds of tests can we run on the gameboard from here?
    expect(tgb.seeds).not.toBeNull();
    expect(tgb.positionCoordinates).not.toBeNull();
    expect(tgb.positions).not.toBeNull();
    //maybe test that a reset works
    //maybe via a loop, confirm all x and y values within seeds/positions are in bounds (less than 10, greater than 0)
    //maybe test a few shots, make sure they are logged correctly!!
    //test that all ships are sunk
    //maybe a mock object to place a ship in a particular way
});

// test('Create a ship on the gameboard', () => {
//     let tgb = BS.GameBoard();
//     let p1 = BS.Player('testP1', tgb, 1);
//     tgb.placeShip(p1, 2, 5, 4);
//     expect(tgb.ships1.length).toBe(1);
//     expect(tgb.ships2.length).toBe(0);
//     expect(tgb.ships1[0].x).toBe(5);
//     expect(tgb.ships1[0].y).toBe(4);
// });

//player tests
test('Testing player params', () => {
    let tp1 = F.Player('Tester');
    let tp2 = F.Player('computer', true); //test to see if this is how you would create computer player.
    expect(tp1.name).toEqual('Tester');
    //expect(tp2.computer).toEqual(true);
    tp1.shot(4, 5);
    tp2.shot(3, 4);
    //console.log(tp1.gameBoard.attacks.hit);
    //console.log(tp1.gameBoard.attacks.mis);
    console.log(tp1.gameBoard.positions);
    //expect(tp1.gameBoard.attacks)
    //test random computer play
    //test player play
});
    //test random move