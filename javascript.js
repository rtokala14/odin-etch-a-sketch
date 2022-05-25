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
    e.target.style.backgroundColor = '#252422';
}


const gridContainer = document.querySelector('#container');


let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

createBoxes(20);