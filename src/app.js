"use strict";
function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    var parent = textarea.parentElement;
    parent.removeChild(textarea);
}
function extractSampleInputs() {
    var a = document.getElementsByClassName('lang-ja') ||
        document.getElementsByClassName('lang-en');
    var preElements = a[0].getElementsByTagName('pre');
    var allSampleInput = [];
    for (var i = 0; i < preElements.length; i++) {
        var e = preElements[i];
        if (e.id.indexOf('pre-sample') === 0) {
            var nth = parseInt(e.id.substr('pre-sample'.length));
            if (nth % 2 === 0) {
                allSampleInput.push(e.innerText);
            }
        }
    }
    return allSampleInput;
}
function extractSampleOutputs() {
    var a = document.getElementsByClassName('lang-ja') ||
        document.getElementsByClassName('lang-en');
    var preElements = a[0].getElementsByTagName('pre');
    var allSampleOutput = [];
    for (var i = 0; i < preElements.length; i++) {
        var e = preElements[i];
        if (e.id.indexOf('pre-sample') === 0) {
            var nth = parseInt(e.id.substr('pre-sample'.length));
            if (nth % 2 === 1) {
                allSampleOutput.push(e.innerText);
            }
        }
    }
    return allSampleOutput;
}
function copyAllSampleInputToClipBoard() {
    copyToClipboard(extractSampleInputs().join('\n'));
}
function copyAllSampleOutputToClipBoard() {
    copyToClipboard(extractSampleOutputs().join('\n'));
}
function insertNextTo(newChild, refChild) {
    if (refChild.parentNode === null)
        return;
    refChild.parentNode.insertBefore(newChild, refChild.nextSibling.nextSibling);
}
function addButtonToCopyAllSampleInput() {
    var ioStyle = document.getElementsByClassName('io-style');
    for (var i = 0; i < ioStyle.length; i++) {
        var inputButton = document.createElement('span');
        inputButton.className = 'btn btn-default btn-sm btn-copy';
        inputButton.innerText = 'Copy All sample inputs';
        inputButton.onclick = copyAllSampleInputToClipBoard;
        var outputButton = document.createElement('span');
        outputButton.className = 'btn btn-default btn-sm btn-copy ml-1';
        outputButton.innerText = 'Copy All sample outputs';
        outputButton.onclick = copyAllSampleOutputToClipBoard;
        var hr = document.createElement('hr');
        insertNextTo(outputButton, ioStyle[i]);
        insertNextTo(inputButton, ioStyle[i]);
        insertNextTo(hr, ioStyle[i]);
    }
}
addButtonToCopyAllSampleInput();
