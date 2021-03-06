let currentColor = 'rgb(37, 36, 34)';
let currSize = 16;
let currMode = 'color';
const BASE_COLOR = '#fffcf2'

function createBoxes(lenSide) {
    gridContainer.style.gridTemplateColumns = `repeat(${lenSide}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${lenSide}, 1fr)`;
    for (let i = 0; i <= lenSide*lenSide; i++) {
        let box = document.createElement('div');
        let clas = 'grid-box';
        box.classList.add(clas);
        box.addEventListener('mouseover', colorBox);
        box.addEventListener('mousedown', colorBox);
        gridContainer.appendChild(box);
    }
}

function colorBox(e) {
    if (e.type == 'mouseover' && !mouseDown) return;
    if (currMode === 'erase') {
        e.target.style.backgroundColor = BASE_COLOR;
        return;
    }
    if (currMode === 'rain') {
        e.target.style.backgroundColor = randomColor();
        return;
    }
    if (currMode === 'dark') {
        let oldColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = RGB_Linear_Shade(-0.1, oldColor);
        return;
    }
    if (currMode === 'light') {
        let oldColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = RGB_Linear_Shade(0.1, oldColor);
        return;
    }
    e.target.style.backgroundColor = currentColor;
}

function changeSize(size) {
    currSize = size;
    reloadGrid();
}

function reloadGrid() {
    clearGrid();
    createBoxes(currSize);
}

function clearGrid() {
    gridContainer.innerHTML = '';
}

function activateMode(nMode) {
    let currId = '#' + currMode + 'Button';
    let node = document.querySelector(currId);
    node.classList.remove('active');

    let newId = '#' + nMode + 'Button';
    node = document.querySelector(newId);
    node.classList.add('active');
    currMode = nMode;
}

function randomColor() {
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return '#' + randColor;
}

const RGB_Linear_Shade=(p,c)=>{
    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
    return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
}


const gridContainer = document.querySelector('#container');
const slider = document.querySelector('.slider');
const sizeOut = document.querySelector('#boxSize');
const clearBtn = document.querySelector('#clearButton');
const colorBtn = document.querySelector('#colorButton');
const eraseBtn = document.querySelector('#eraseButton');
const rainBtn = document.querySelector('#rainButton');
const darkBtn = document.querySelector('#darkButton');
const lightBtn = document.querySelector('#lightButton');

/*Slider output value*/
sizeOut.textContent = slider.value + " x " + slider.value;
slider.onmousemove = function() {
    sizeOut.textContent = slider.value + " x " + slider.value;
}
slider.onchange = (e) => changeSize(e.target.value);

/*Clear Grid Button*/
clearBtn.onclick = () => reloadGrid();

/*Color Button*/
colorBtn.onclick = () => activateMode('color');

/*Erase Button*/
eraseBtn.onclick = () => activateMode('erase');

/*Rainbow Button*/
rainBtn.onclick = () => activateMode('rain');

/*darker button*/
darkBtn.onclick = () => activateMode('dark');

/*lighter button*/
lightBtn.onclick = () => activateMode('light');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

window.onload = () => {
    createBoxes(currSize);
    activateMode(currMode);
}