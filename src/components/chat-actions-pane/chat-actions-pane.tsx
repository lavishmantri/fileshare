import { useState } from 'react';
import { getSocket } from '../../service/websocket';
import { Button } from '../button/button';
import { Input } from '../input/input';
import './chat-actions-pane.css';

interface ChatActionsPaneProps {}

export const ChatActionsPane: React.FC<ChatActionsPaneProps> = () => {
  const [text, setText] = useState('');
  const handleButtonClick = () => {};
  const handleInputChange = (value: string) => {
    setText(value);
  };

  const handleOnEnter = (value: string) => {
    console.log('Sending msg: ', value);
    getSocket().emit('message', value);
    setText('');
  };

  return (
    <div className="chat-actions-pane d-flex-row mt-8">
      <Input
        className="flex-grow"
        onChange={handleInputChange}
        onEnter={handleOnEnter}
        value={text}
      />
      <Button className="send ml-4" onClick={handleButtonClick} text="send" />
    </div>
  );
};
