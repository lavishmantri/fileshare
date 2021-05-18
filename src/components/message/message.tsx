import { Row } from '../row/row';

export interface Message {
  from: string;
  text: string;
}

interface MessageProps {
  message: Message;
}

export const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  return (
    <Row>
      <div>{message.from}</div>
      <div>{message.text}</div>
    </Row>
  );
};
