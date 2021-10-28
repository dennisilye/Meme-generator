'use strict';

var gCanvasX;
var gCanvasY;
var gCurrFont = 'impact'
var gElCanvas;
var gCtx;
var gIsDragging = false;
var gStartPos;
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }];



function onInit() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    gCanvasX = gElCanvas.width;
    gCanvasY = gElCanvas.height;
 

    addMouseListeners();
    drawImage();
}

function onPickImage(imgId) {
    console.log(imgId);
    gMeme.selectedImgId = imgId;
    drawImage();
    document.querySelector('.gallery-container').classList.add('hide');
    document.querySelector('.meme-editor').classList.remove('hide');

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
    console.log('ondown');
    const pos = getEvPos(ev)
    if (!isTextClicked) return;
    gIsDrag = true;
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
    console.log('move');
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (gIsDrag) {
        const pos = getEvPos(ev)
         const dx = pos.x - gStartPos.x;
         const dy = pos.y - gStartPos.y;
         line.pos.x += dx;
         line.pos.y += dy;
         gStartPos = pos;
         drawImage();
         
    }
  
}


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    };
  
    return pos;
}

function onDownLoadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

