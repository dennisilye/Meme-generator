'use strict';

function onInit() {
    renderImages();
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    gCanvasX = gElCanvas.width;
    gCanvasY = gElCanvas.height;
    addMouseListeners();
    renderCanvas();
    
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function onUp() {
    gIsDrag = false;
    document.body.style.cursor = 'grab';
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (findClickedText(pos) !== -1) gMeme.selectedLineIdx = findClickedText(pos);
    else return;
    gIsDrag = true;
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
    const line = getCurrLine();
    if (gIsDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        line.pos.x += dx;
        line.pos.y += dy;
        gStartPos = pos;
        renderCanvas();

    }

}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    };

    return pos;
}




