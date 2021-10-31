'use strict';

var gMeme = {
    selectedImgId: 4,
    selectedLineIdx: 0,
    lines: []
}
var gSavedMemes = [];
const KEY = 'savedMemes';

function addToSavedMemes(img) {
    gSavedMemes.push(img);
    return saveToStorage(KEY, gSavedMemes);
}

function getSavedMemes() {
    gSavedMemes = loadFromStorage(KEY);
    if (!gSavedMemes) gSavedMemes = [];
    return gSavedMemes;
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes();
    let strHtml = '<h2>My saved memes</h2>';
    strHtml += savedMemes.map((meme) => {
            return `<img src="${meme}" >`;
        })
        .join('');
    document.querySelector('.saved-memes').innerHTML = strHtml;
}

function onChangeFontSize(ev, val) {
    ev.preventDefault();
    const line = getCurrLine();
    if (line.size >= 60 && val > 0) return;
    else if (line.size <= 20 && val < 0) return;
    line.size += val;
    renderCanvas();
}

function onMoveText(ev, val) {
    ev.preventDefault();
    const line = getCurrLine();
    line.pos.y += val;
    renderCanvas();

}

function onSwitchLines(ev) {
    ev.preventDefault();
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx++;

}

function onChangeFont(ev, elFont) {
    ev.preventDefault();
    const line = getCurrLine();
    line.font = elFont.value;
    renderCanvas();

}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function onCreateNewLine(ev) {
    if (ev) ev.preventDefault();
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
        font: 'impact',
        pos: {
            x: gCanvasX / 2,
            y,
        },
    }
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    renderCanvas();
}

function onDeleteLine(ev) {
    ev.preventDefault();
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
    renderCanvas();

}


function onChangeColor(ev, elColor) {
    ev.preventDefault();
    const line = getCurrLine();
    line.color = elColor.value;
    renderCanvas();

}

function writeMemeTxt(input) {
    if (!gMeme.lines.length) onCreateNewLine();
    const line = getCurrLine();
    line.txt = input.value;
    renderCanvas();

}

function findClickedText(clickedPos) {
    const lineRadius = 30;
    return gMeme.lines.findIndex(line => {
        const { pos } = line;
        const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
        return distance <= line.size + lineRadius;

    })
}

function onSaveMeme(ev) {
    ev.preventDefault();
    renderCanvas();
    const imgContent = gElCanvas.toDataURL('image/jpeg');
    addToSavedMemes(imgContent);
}

function onDownLoadMeme(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

