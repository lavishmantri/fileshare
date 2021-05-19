import { getPeerConnection } from './peer-connection';

export function sendData(files) {
  const file = files[0];
  console.log(`File is ${[file.name, file.size, file.type, file.lastModified].join(' ')}`);

  // Handle 0 size files.
  if (file.size === 0) {
    // bitrateDiv.innerHTML = '';
    // statusMessage.textContent = 'File is empty, please select a non-empty file';
    // closeDataChannels();
    console.log('File size is 0, closing data channel');
    return;
  }

  // sendProgress.max = file.size;
  // receiveProgress.max = file.size;
  const chunkSize = 16384;
  const fileReader = new FileReader();
  let offset = 0;
  fileReader.addEventListener('error', error => console.error('Error reading file:', error));
  fileReader.addEventListener('abort', event => console.log('File reading aborted:', event));
  fileReader.addEventListener('load', e => {
    if (!e?.target) {
      console.log('No event');
      return;
    }
    console.log('FileRead.onload ', e);
    getPeerConnection().channel.send(e.target.result);
    offset += (e.target.result as ArrayBuffer).byteLength;
    // sendProgress.value = offset;
    if (offset < file.size) {
      readSlice(offset);
    }
  });
  const readSlice = o => {
    console.log('readSlice ', o);
    const slice = file.slice(offset, o + chunkSize);
    fileReader.readAsArrayBuffer(slice);
  };
  readSlice(0);
}
