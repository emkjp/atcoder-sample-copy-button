function copyToClipboard(text: string): void {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  const parent = textarea.parentElement as Node;
  parent.removeChild(textarea);
}

function extractSampleInputs(): string[] {
  const a =
    document.getElementsByClassName('lang-ja') ||
    document.getElementsByClassName('lang-en');

  const preElements = (a[0] as HTMLSpanElement).getElementsByTagName('pre');

  const allSampleInput = [];

  for (let i = 0; i < preElements.length; i++) {
    const e = preElements[i] as HTMLPreElement;
    if (e.id.indexOf('pre-sample') === 0) {
      const nth = parseInt(e.id.substr('pre-sample'.length));
      if (nth % 2 === 0) {
        allSampleInput.push(e.innerText);
      }
    }
  }

  return allSampleInput;
}

function extractSampleOutputs(): string[] {
  const a =
    document.getElementsByClassName('lang-ja') ||
    document.getElementsByClassName('lang-en');

  const preElements = (a[0] as HTMLSpanElement).getElementsByTagName('pre');

  const allSampleOutput = [];

  for (let i = 0; i < preElements.length; i++) {
    const e = preElements[i] as HTMLPreElement;
    if (e.id.indexOf('pre-sample') === 0) {
      const nth = parseInt(e.id.substr('pre-sample'.length));
      if (nth % 2 === 1) {
        allSampleOutput.push(e.innerText);
      }
    }
  }

  return allSampleOutput;
}

function copyAllSampleInputToClipBoard(): void {
  copyToClipboard(extractSampleInputs().join('\n'));
}

function copyAllSampleOutputToClipBoard(): void {
  copyToClipboard(extractSampleOutputs().join('\n'));
}

function insertNextTo(newChild: HTMLElement, refChild: HTMLElement): void {
  if (refChild.parentNode === null) return;
  refChild.parentNode.insertBefore(
    newChild,
    (refChild.nextSibling as Node).nextSibling
  );
}

function addButtonToCopyAllSampleInput(): void {
  const ioStyle = document.getElementsByClassName('io-style');
  for (let i = 0; i < ioStyle.length; i++) {
    const inputButton = document.createElement('span') as HTMLSpanElement;
    inputButton.className = 'btn btn-default btn-sm btn-copy';
    inputButton.innerText = 'Copy All sample inputs';
    inputButton.onclick = copyAllSampleInputToClipBoard;

    const outputButton = document.createElement('span') as HTMLSpanElement;
    outputButton.className = 'btn btn-default btn-sm btn-copy ml-1';
    outputButton.innerText = 'Copy All sample outputs';
    outputButton.onclick = copyAllSampleOutputToClipBoard;

    const hr = document.createElement('hr');
    insertNextTo(outputButton, ioStyle[i] as HTMLElement);
    insertNextTo(inputButton, ioStyle[i] as HTMLElement);
    insertNextTo(hr, ioStyle[i] as HTMLElement);
  }
}

addButtonToCopyAllSampleInput();
