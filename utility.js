export function arrEqual(a, b) {
    //if length is not equal, break right away
    if(a.length !== b.length) return false;
    //comparing each element of array - if elements aren't same, break
    for(let i = 0; i < a.length; i += 1) {
        if(a[i] !== b[i]) return false;
    }
    return true; //otherwise they are equal.
}

export function arrInclude(arr, arrIncluded) { //does an array of arrays contain a matching array? lol
    for(let i = 0; i < arr.length; i += 1) {
        if(arrEqual(arr[i], arrIncluded)) { //for each subarray of arr, is it the same as arrIncluded?
            return true;
        }
    }
    return false; //otherwise the array is not included.
}

export const randomShip = () => { //randomizes coordinates of ship, and the direction. returns obj w/ data
    const direction = ['v', 'h'];
    const X = Math.floor(Math.random() * (10 - 0 + 1)) + 0; //whole integer 1-10 ...not sure how this works tbh
    const Y = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
  
    const directionStr = direction[Math.floor(Math.random() * (1 - 0 + 1)) + 0]; //will only ever be one or zero. 
  
    return { X, Y, directionStr }; 
  };

  export function fireBoard(x, y, grid, hit) { //dom function to change the class type of a square that's hit
    if (hit) {
      grid.children[y].children[x].classList.add('hitted');
    } else {
      grid.children[y].children[x].classList.add('missed');
    }
  }
  
  export function resetBoard(grid) { //also dom function to change grid board back to default.
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const item = grid.children[i].children[j];
        item.className = '';
        item.classList.add('grid-item');
      }
    }
  }