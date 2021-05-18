import { ChatActionsPane } from '../chat-actions-pane/chat-actions-pane';
import { MessagePane } from '../message-pane/message-pane';
import './chat-panel.css';

export const ChatPanel: React.FC = () => {
  return (
    <div className="chat-panel">
      <MessagePane />
      <ChatActionsPane />
    </div>
  );
};
