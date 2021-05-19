import { useState } from 'react';
import { getPeerConnection } from '../../service/peer-connection';

interface InputProps {
  className?: string;
  value?: string;
  onSend?: (file) => void;
}

export const FilesInput: React.FC<InputProps> = ({ className = '', value, onSend }) => {
  const [files, setFiles] = useState<any>([]);

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    console.log(files);
    const filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    setFiles([...filesArr]);
  };

  const handleFileClick = file => {
    getPeerConnection().channel.send('sending file data. pls recieve');
    // sendData([file]);
    console.log('File sent: ', file);
  };

  return (
    <div className="files-container">
      <input value={value} onChange={handleOnChange} className={`input ${className}`} type="file" />

      {files.map(file => (
        <div className="file-preview" onClick={() => handleFileClick(file)}>
          {file.name}
        </div>
      ))}
    </div>
  );
};
