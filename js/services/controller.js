'use strict';

var gCanvasX;
var gCanvasY;
var gElCanvas;
var gCtx;
var gStartPos;
var gIsDrag = false;
var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['men', 'funny'] },
    { id: 2, url: 'images/2.jpg', keywords: ['animal'] },
    { id: 3, url: 'images/3.jpg', keywords: ['animal', 'smile'] },
    { id: 4, url: 'images/4.jpg', keywords: ['animal'] },
    { id: 5, url: 'images/5.jpg', keywords: ['men'] },
    { id: 6, url: 'images/6.jpg', keywords: ['men'] },
    { id: 7, url: 'images/7.jpg', keywords: ['men', 'smile'] },
    { id: 8, url: 'images/8.jpg', keywords: ['men', 'smile'] },
    { id: 9, url: 'images/9.jpg', keywords: ['men', 'smile', 'funny'] },
    { id: 10, url: 'images/10.jpg', keywords: ['men', 'smile', 'funny'] },
    { id: 11, url: 'images/11.jpg', keywords: ['men'] },
    { id: 12, url: 'images/12.jpg', keywords: ['men', 'funny'] },
    { id: 13, url: 'images/13.jpg', keywords: ['men', 'smile'] },
    { id: 14, url: 'images/14.jpg', keywords: ['men'] },
    { id: 15, url: 'images/15.jpg', keywords: ['men'] },
    { id: 16, url: 'images/16.jpg', keywords: ['men', 'smile', 'funny'] },
    { id: 17, url: 'images/17.jpg', keywords: ['men'] },
    { id: 18, url: 'images/18.jpg', keywords: ['men', 'funny'] },
    { id: 19, url: 'images/19.jpg', keywords: ['happy'] },
    { id: 20, url: 'images/20.jpg', keywords: ['women', 'funny'] },
    { id: 21, url: 'images/21.jpg', keywords: ['men', 'funny'] },
    { id: 22, url: 'images/22.jpg', keywords: ['animal', 'funny'] },
    { id: 23, url: 'images/23.jpg', keywords: ['men', 'funny'] },
    { id: 24, url: 'images/24.jpg', keywords: ['women'] },
    { id: 25, url: 'images/25.jpg', keywords: ['men', 'funny'] },
];



function renderImages(imgs = gImgs) {
    var strHTMl = '';
    imgs.forEach(img => {
        strHTMl += `<img class="img-item" src="images\\${img.id}.jpg" onclick="onPickImage(${img.id})" />`
    })
    document.querySelector('.img-container').innerHTML = strHTMl;
}

function renderCanvas() {
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
    gCtx.font = `${gMeme.lines[idx].size}px ${gMeme.lines[idx].font}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);

}

function onOpenGallery(ev) {
    ev.preventDefault();
    gMeme.lines = [];
    document.querySelector('.meme-text').value = '';
    document.querySelector('.gallery-container').classList.remove('hide');
    document.querySelector('.meme-editor').classList.add('hide');
    renderImages();
}

function sortGalleryBy(ev, elTxt) {
    ev.preventDefault();
    const keywordToSortBy = elTxt.innerText.toLowerCase();
    let imgs = [];
    gImgs.forEach(img => {
        if(img.keywords.includes(keywordToSortBy)) imgs.push(img);
        
    } )
    renderImages(imgs);
}

function onToggleMenu(ev) {
    ev.preventDefault();
    document.body.classList.toggle('open-menu');

}

function onPickImage(imgId) {
    gMeme.selectedImgId = imgId;
    adjustCanvasHeight(imgId);
    renderCanvas();
    document.querySelector('.gallery-container').classList.add('hide');
    document.querySelector('.meme-editor').classList.remove('hide');

}

function adjustCanvasHeight(imgIdx) {
    var img = new Image();
    img.src = `./images/${imgIdx}.jpg`
    var canvasHeight = (img.height * gCanvasX) / img.width;
    document.querySelector('canvas').height = canvasHeight;
    document.querySelector('.canvas-container-outline').style.height = canvasHeight + 20 + "px";

}

function onToggleSavedMemes(ev) {
    ev.preventDefault();
    document.body.classList.toggle('open-memes');
    renderSavedMemes();
    
}






