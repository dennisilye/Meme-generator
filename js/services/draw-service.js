'use strict';

var gIsDrag = false;
var gMeme = {
    selectedImgId: 4,
    selectedLineIdx: 0,
    lines: []
}

function drawImage() {
    var img = new Image();
    img.src = `./images/${gMeme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        gMeme.lines.forEach((line, idx) => drawText(line.txt, line.pos.x, line.pos.y, idx))
    
    };

}

function drawText(text, x, y, idx) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = `${gMeme.lines[idx].color}`;
    gCtx.font = `${gMeme.lines[idx].size}px ${gCurrFont}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);

}

function writeMemeTxt(input) {
    gMeme.lines[gMeme.selectedLineIdx].txt = input.value;
    drawImage();

}


function isTextClicked(clickedPos) {
    console.log('hello');
    for (let i = 0; i < gMeme.lines.length; i++) {
        if (getClickedLine(clickedPos.x, clickedPos.y, i)) {
            gMeme.selectedLineIdx = i;

        }
    }
    const distance = Math.sqrt((gMeme.lines[gMeme.selectedLineIdx].pos.x - clickedPos.x) ** 2 + (gMeme.lines[gMeme.selectedLineIdx].pos.y - clickedPos.y) ** 2)
    return distance <= gMeme.lines[gMeme.selectedLineIdx].size ;
}


