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
function extractSampleInputsAndOutputs() {
    var a = document.getElementsByClassName('lang-ja') ||
        document.getElementsByClassName('lang-en');
    var preElements = a.length > 0
        ? a[0].getElementsByTagName('pre')
        : document.getElementsByTagName('pre');
    var allSamples = [];
    for (var i = 0; i < preElements.length; i++) {
        var e = preElements[i];
        if (e.id.indexOf('pre-sample') === 0) {
            allSamples.push(e.innerText);
        }
    }
    return allSamples;
}
function insertNextTo(newChild, refChild) {
    if (refChild.parentNode === null)
        return;
    refChild.parentNode.insertBefore(newChild, refChild.nextSibling.nextSibling);
}
function addButtonToCopyAllSampleInput(sampleInputs, sampleOutputs) {
    var ioStyle = document.getElementsByClassName('io-style');
    for (var i = 0; i < ioStyle.length; i++) {
        var inputButton = document.createElement('span');
        inputButton.className = 'btn btn-default btn-sm btn-copy';
        inputButton.innerText = 'Copy All sample inputs';
        inputButton.onclick = function () { return copyToClipboard(sampleInputs.join('\n')); };
        var outputButton = document.createElement('span');
        outputButton.className = 'btn btn-default btn-sm btn-copy ml-1';
        outputButton.innerText = 'Copy All sample outputs';
        outputButton.onclick = function () {
            return copyToClipboard(sampleOutputs.join('\n'));
        };
        var hr = document.createElement('hr');
        insertNextTo(outputButton, ioStyle[i]);
        insertNextTo(inputButton, ioStyle[i]);
        insertNextTo(hr, ioStyle[i]);
    }
}
var samples = extractSampleInputsAndOutputs();
if (samples.length > 0) {
    var sampleInputs = samples.filter(function (s, index) { return index % 2 == 0; });
    var sampleOutputs = samples.filter(function (s, index) { return index % 2 == 1; });
    addButtonToCopyAllSampleInput(sampleInputs, sampleOutputs);
}
