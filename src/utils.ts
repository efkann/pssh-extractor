const DRM_TYPES = {
  'edef8ba9-79d6-4ace-a3c8-27dcd51d21ed': 'Widevine',
  '9a04f079-9840-4286-ab92-e65be0885f95': 'PlayReady',
  '1077efec-c0b2-4d02-ace3-3c1e52e2fb4b': 'WC3 Common',
  '3ea8778f-7742-4bf9-b18b-e834b2acbd47': 'Clear Key AES-128',
  'be58615b-19c4-4684-88b3-c8c57e99e957': 'Clear Key SAMPLE-AES',
  'e2719d58-a985-b3c9-781a-b030af78d30e': 'Clear Key DASH-IF',
  '5e629af5-38da-4063-8977-97ffbd9902d4': 'Marlin',
  '9a27dd82-fde2-4725-8cbc-4234aa06ec09': 'Verimatrix VCAS',
  'b4413586-c58c-ffb0-94a5-d4896c1af6c3': 'Viaccess-Orca DRM',
  '793b7956-9f94-4946-a942-23e7ef7e44b4': 'VisionCrypt',
  '80a6be7e-1448-4c37-9e70-d5aebe04c8d2': 'Irdeto Content Protection',
  '94ce86fb-07ff-4f43-adb8-93d2fa968ca2': 'FairPlay',
  'f239e769-efa3-4850-9c16-a903c6932efb': 'Adobe Primetime',
} as const;

type UUID = keyof typeof DRM_TYPES;

export type PsshArray = Array<{
  type: (typeof DRM_TYPES)[UUID] | 'Unknown';
  data: string;
}>;

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
  const psshArray: PsshArray = [];
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

    const uuid = Array.from(arrWeNeed.slice(12, 28))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
      .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');

    const drmType = uuid in DRM_TYPES ? DRM_TYPES[uuid as UUID] : 'Unknown';

    psshArray.push({ type: drmType, data: pssh });
  }
  return psshArray;
};
