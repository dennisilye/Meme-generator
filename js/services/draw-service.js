'use strict';

var gIsDrag = false;
var gMeme = {
    selectedImgId: 4,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Hello',
            size: 40,
            align: 'left',
            color: 'red',
            pos: { x: 145, y: 40 },
            width: 0,
        },
        {
            txt: 'World',
            size: 40,
            align: 'left',
            color: 'red',
            pos: { x: 145, y: 300 },
            width: 0,
        }
    ]
}

// function addNewLine(params) {
//     let y = 40;
//     const linesCount = gMeme.lines.length;
//     if (linesCount === 1) y = canvasH - 40;
//     else if (linesCount > 0) y = canvasH / 2;
//     const newLine = {
//         txt: '',
//         width: 0,
//         size: 40,
//         align: 'center',
//         isStroke: true,
//         color,
//         font,
//         pos: {
//             x: canvasW / 2,
//             y,
//         },
        
//     };
//     gMeme.lines.push(newLine);
// }


function drawImage() {
    var img = new Image();
    img.src = `./images/${gMeme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        // Maybe loop?
        drawText(gMeme.lines[0].txt, gMeme.lines[0].pos.x, gMeme.lines[0].pos.y, 0);
        drawText(gMeme.lines[1].txt, gMeme.lines[1].pos.x, gMeme.lines[1].pos.y, 1);
    };

}

function drawText(text, x, y, idx) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
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
        // const line = gMeme.lines[i];
        if (getClickedLine(clickedPos.x,clickedPos.y,i)) {
            gMeme.selectedLineIdx = i;
            
        } 
    }
    const distance = Math.sqrt((gMeme.lines[gMeme.selectedLineIdx].pos.x - clickedPos.x) ** 2 + (gMeme.lines[gMeme.selectedLineIdx].pos.y - clickedPos.y) ** 2)
    return distance <= gMeme.lines[gMeme.selectedLineIdx].size
}


