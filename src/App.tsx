import React, { useEffect, useState } from 'react';
import './App.css';
import { ChatPanel } from './components/chat-panel/chat-panel';
import { ConnectPane } from './components/connect-pane/connect-pane';
import { connectToSocket } from './service/websocket';

function getParamFromURL() {
  return window.location.pathname.split('/')[1];
}

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState('');

  useEffect(() => {
    const p = getParamFromURL();
    setPath(p);

    connectToSocket({}).then(ws => {
      setLoading(false);
      console.log('Sending message...');
      ws.emit('message', 'Hello there!');
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="app">
      <header className="App-header">File share</header>
      <section className="app-content">
        <ConnectPane />
        <ChatPanel />
      </section>
    </div>
  );
};

export default App;
