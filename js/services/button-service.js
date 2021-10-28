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
    if (gMeme.selectedLineIdx === 0) gMeme.selectedLineIdx = 1;
    else gMeme.selectedLineIdx = 0;
    
}