function copyToClipboard(text: string): void {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  const parent = textarea.parentElement as Node;
  parent.removeChild(textarea);
}

function extractSampleInputsAndOutputs(): string[] {
  const a =
    document.getElementsByClassName('lang-ja') ||
    document.getElementsByClassName('lang-en');

  const preElements =
    a.length > 0
      ? (a[0] as HTMLSpanElement).getElementsByTagName('pre')
      : document.getElementsByTagName('pre');

  const allSamples = [];

  for (let i = 0; i < preElements.length; i++) {
    const e = preElements[i] as HTMLPreElement;
    if (e.id.indexOf('pre-sample') === 0) {
      allSamples.push(e.innerText);
    }
  }

  return allSamples;
}

function insertNextTo(newChild: HTMLElement, refChild: HTMLElement): void {
  if (refChild.parentNode === null) return;
  refChild.parentNode.insertBefore(
    newChild,
    (refChild.nextSibling as Node).nextSibling
  );
}

function addButtonToCopyAllSampleInput(
  sampleInputs: string[],
  sampleOutputs: string[]
): void {
  const ioStyle = document.getElementsByClassName('io-style');
  for (let i = 0; i < ioStyle.length; i++) {
    const inputButton = document.createElement('span') as HTMLSpanElement;
    inputButton.className = 'btn btn-default btn-sm btn-copy';
    inputButton.innerText = 'Copy All sample inputs';
    inputButton.onclick = (): void => copyToClipboard(sampleInputs.join('\n'));

    const outputButton = document.createElement('span') as HTMLSpanElement;
    outputButton.className = 'btn btn-default btn-sm btn-copy ml-1';
    outputButton.innerText = 'Copy All sample outputs';
    outputButton.onclick = (): void =>
      copyToClipboard(sampleOutputs.join('\n'));

    const hr = document.createElement('hr');
    insertNextTo(outputButton, ioStyle[i] as HTMLElement);
    insertNextTo(inputButton, ioStyle[i] as HTMLElement);
    insertNextTo(hr, ioStyle[i] as HTMLElement);
  }
}

const samples = extractSampleInputsAndOutputs();
if (samples.length > 0) {
  const sampleInputs = samples.filter((s, index) => index % 2 == 0);
  const sampleOutputs = samples.filter((s, index) => index % 2 == 1);
  addButtonToCopyAllSampleInput(sampleInputs, sampleOutputs);
}
