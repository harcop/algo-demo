var w = 40;
var rows, cols
var grids = [];
var pos = Math.floor(Math.random() * 10) + 1;

var dir = 'down';
var path = [10, 11, 12];
var road = [];
var snake = null;
function setup() {
    createCanvas(400, 400);
    rows = floor(height/w);
    cols = floor(width/w);
    
    for(let y = 0; y < rows; y++) {
        for(let x = 0; x < cols; x++) {
            let ceil = new Ceil(x, y);
            grids.push(ceil);
        }
    }
    snake = new Snake();
    snake.append(15);
    console.log(snake);
}

function draw() {
    background(33, 56, 89); 
    for (let i = 0; i < grids.length; i++) {
        grids[i].show();
    }
    grids[pos].fruit();
    snake.move();
//    console.log(snake) 
    frameRate(10);
}

function keyPressed () {
    if (keyCode === UP_ARROW) {
        if (dir === 'right' ||  dir === 'left') {
            dir = 'up';
        }
    }
    else if (keyCode === DOWN_ARROW) {
        if (dir === 'right' ||  dir === 'left') {
            dir = 'down';
        }
    }
    else if (keyCode === RIGHT_ARROW) {
        if (dir === 'up' ||  dir === 'down') {
            dir = 'right';
        }
    }
    else if (keyCode === LEFT_ARROW) {
        if (dir === 'up' ||  dir === 'down') {
            dir = 'left';
        }
    }
}

function Ceil(i, j) {
    this.x = i;
    this.y = j;
    this.isPaint = false;
    
    var x = this.x*w;
    var y = this.y*w;
    this.show = function () {
        stroke(200);
        fill(233,231,233);
        rect(x,y,w,w);
    }
    
    this.paint = function () {
        fill(0,231,233);
        rect(x,y,w,w);
    }
    
    this.fruit = function () {
        this.isPaint = true;
        fill(40,40,43);
        rect(x,y,w,w);
    }
}

function Snake() {
    this.head = null;
    this.tail = null;
    
    this.append = function (value) {
        const node = new Node(value);
        let current = this.head;
        if (current === null) {
            this.head = node;
            this.tail = node;
        }
        else {
            current = this.tail;
            current.previous = node;
            node.next = current;
            this.tail = node;
        }
        return this;
    }
    
    this.move = function () {
        let current = this.head;
        while (current !== null) {
            let value = current.value;
            grids[value].paint();
            if (current.next === null) {
////                
                let gps = this.traverse();
                if (gps.includes(value)) {
                    this.empty();
                }
                
                let appender = false;
                let tail = this.tail.value;
                if (value === pos) {
                    appender = true;
                }
                if (dir === 'right') {
                    if (appender) {
                        this.append(tail-1);
                    }
                    if (grids[value].x === rows - 1){
                        current.value -= rows -1;
                    }else {
                        current.value += 1; 
                    }
                }
                else if (dir === 'left') {
                    if (appender) {
                        this.append(tail+1);
                    }
                    if (grids[value].x === 0){
                        current.value += rows -1;
                    }else {
                        current.value -= 1; 
                    }
                }
                else if (dir === 'down') {
                    if (appender) {
                        if (tail-rows < 0) {
                            tail *=rows-1;
                            this.append(tail);
                        }
                        else {
                            this.append(tail-rows);
                        }
                    }
                    if (grids[value].y === rows -1){
                        current.value -= (rows-1)*rows;
                    }else {
                        current.value += rows;
                    }
                }
                else if (dir === 'up') {
                    if (appender) {
                        this.append(tail+rows);
                    }
                    if (grids[value].y === 0){
                        current.value += (rows-1)*rows;
                    }else {
                        current.value -= rows;
                    }
                }
                if (appender) {
                     let gPos = Math.floor(Math.random() * grids.length);
                    while (grids[gPos].isPaint === true) {
                     gPos = Math.floor(Math.random() * grids.length);
                    }
                    pos = gPos;
                }
                current.oldValue = value;
            }
            else {
                current.value = current.next.oldValue;
                current.oldValue = value;
            }
            current = current.previous;
        }
        console.log('ended');
    }
    
    this.traverse = function () {
        let current = this.head.previous;
        let gps = [];
        while(current !== null) {
            gps.push(current.value);
            current = current.previous;
        }
        return gps;
    }
    
    this.empty = function () {
        let current = this.head.previous;
        while(current !== null) {
            gps.push(current.value);
            current = current.previous;
        }
        
    }
}

function Node(value) {
    this.value = value;
    this.oldValue = value;
    this.previous = null;
    this.next = null;
}