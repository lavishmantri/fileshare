import React, { useState } from 'react';
import { registerOnMsgRecieve } from '../../service/websocket';
import { Message, MessageComponent } from '../message/message';
import './message-pane.css';

export const MessagePane: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  registerOnMsgRecieve((data: any) => {
    setMessages([
      ...messages,
      {
        from: 'other user',
        text: data,
      },
    ]);
  });

  return (
    <div className="message-pane">
      {messages.map((message, idx) => (
        <MessageComponent key={`${idx}_${message.text}`} message={message} />
      ))}
    </div>
  );
};
