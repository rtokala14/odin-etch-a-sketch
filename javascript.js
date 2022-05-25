function createBoxes(lenSide) {
    gridContainer.style.gridTemplateColumns = `repeat(${lenSide}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${lenSide}, 1fr)`;
    for (let i = 0; i <= lenSide*lenSide; i++) {
        let box = document.createElement('div');
        let clas = 'grid-box';
        box.classList.add(clas);
        gridContainer.appendChild(box);
    }
}

const gridContainer = document.querySelector('#container');
createBoxes(8);