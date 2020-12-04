const arr = [
    [0,0,0,],
    [0,0,0,],
    [0,0,0,],
];
let gridPos = [0,1,2,3,4,5,6,7,8];
let winner = "-1";

function play({x, y, player}) {
    if (player === 1) {
        arr[y][x] = "O";
    }else {
        arr[y][x] = "X";
    }
}

function cPlayers() {
    //computer player;
    let space = true;
    let currentPlayer = 1;
    while (space) {
        let _s = checkSpace();
        if (!_s) {
            break;
        }
        let rnd = pick();
        let y = Math.floor(rnd / 3);
        let x = Math.floor(rnd % 3);
        console.log({x,y})
        if (arr[y][x] === 0) {
            play({x, y, player:currentPlayer});
            currentPlayer = 1 - currentPlayer;
        }
        let wins = checkWinner()
        if (wins) {
            break;
        }
    }
}

function checkSpace() {
    let z = 0;
    for(let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] !== 0) {
                z += 1;
            }
        }
    }
    if (z === 9) {
        return false;
    }
    return true;
}

function pick () {
    let rnd = randBtw(...gridPos);
    gridPos.splice(gridPos.indexOf(rnd),1);
    return rnd;
}

function checkWinner() {
    const wins = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [3,4,5],
        [6,7,8],
    ];
    for (const win of wins) {
        let x = 0;
        let o = 0;
        for(const p of win) {
            let _y = Math.floor(p / 3);
            let _x = Math.floor(p % 3);
            if (arr[_y][_x] === "X") {
                x += 1;
            } else if (arr[_y][_x] === "O") {
                o += 1;
            }
        }
        if (x === 3) {
            console.log("X wins");
            winner = "X"
            break;
        }
        else if (o === 3) {
            console.log("O wins");
            winner = "O"
            break;
        }
    }
    if (winner === "-1") {
        return false;
    }
    return true;
}

function randBtw (...num) {
    const _f = {};
    const _n = num.length * 3;
    let max = 0;
    let p = -1;
    for (let i = 0; i < _n; i++) {
        const pos = Math.floor(Math.random() * num.length);
        if (_f[pos] === undefined) {
            _f[pos] = 0;
        }
        _f[pos] += 1;
        if (_f[pos] > max) {
            max = _f[pos];
            p = pos;
        }
    }
    return num[p];
}

function print(){
    let _f = ""
    for(const _a of arr) {
        _f += _a + "\n";
    }
    console.log(_f);
}
cPlayers();
// console.log(arr);
print();