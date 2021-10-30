'use strict';


function onChangeFontSize(ev, val) {
    ev.preventDefault();
    if (gMeme.lines[gMeme.selectedLineIdx].size >= 60 && val > 0) return;
    else if (gMeme.lines[gMeme.selectedLineIdx].size <= 20 && val < 0) return;
    gMeme.lines[gMeme.selectedLineIdx].size += val;
    drawImage();
}

function onMoveText(ev, val) {
    ev.preventDefault();
    gMeme.lines[gMeme.selectedLineIdx].pos.y += val;
    drawImage();

}

function onSwitchLines(ev) {
    ev.preventDefault();
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx++;

}

function onChangeFont(ev, elFont) {
    ev.preventDefault();
    const font = elFont.value;
    gCurrFont = font;
    drawImage();

}

function onOpenGallery(ev) {
    ev.preventDefault();
    document.querySelector('.gallery-container').classList.remove('hide');
    document.querySelector('.meme-editor').classList.add('hide');
}

function onToggleMenu(ev) {
    ev.preventDefault();
    document.body.classList.toggle('open-menu');

}

function onCreateNewLine(ev) {
    ev.preventDefault();
    var y = 40;
    const linesCount = gMeme.lines.length;
    if (linesCount === 3) return;
    else if (linesCount === 1) y = gCanvasY - y;
    else if (linesCount > 0) y = gCanvasY / 2;
    const newLine = {
        txt: 'Hello',
        size: 40,
        align: 'center',
        color: '#fdffff',
        pos: {
            x: gCanvasX / 2,
            y,
        },
    }
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    drawImage();
}

function onDeleteLine(ev) {
    ev.preventDefault();
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
    drawImage();

}


function onChangeColor(ev, elColor) {
    ev.preventDefault();
    gMeme.lines[gMeme.selectedLineIdx].color = elColor.value;
    drawImage()

}
