export const handleError = (msg: string, callback?: (msg: string) => void) => {
  console.error(msg);
  callback?.(msg);
};

export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export const extractPSSHArray = (buffer: ArrayBuffer) => {
  const view = new Uint8Array(buffer);
  if (view.length === 0) {
    throw new Error('It looks like your file is empty.');
  }
  const str = new TextDecoder('ascii').decode(view);
  const psshOffsets = [];
  const psshArray = [];
  let indexOfOccurence = str.indexOf('pssh', 0);
  while (indexOfOccurence >= 0) {
    psshOffsets.push(indexOfOccurence);
    indexOfOccurence = str.indexOf('pssh', indexOfOccurence + 1);
  }
  if (psshOffsets.length === 0) {
    throw new Error(`Failed to extract PSSH from your file.`);
  }
  for (const offset of psshOffsets) {
    const offsetStart = offset - 4;
    const offsetEnd = view[offset - 2] * 256 + view[offset - 1];
    const arrWeNeed = view.slice(offsetStart, offsetStart + offsetEnd);
    const pssh = arrayBufferToBase64(arrWeNeed);
    psshArray.push(pssh);
  }
  return psshArray;
};
