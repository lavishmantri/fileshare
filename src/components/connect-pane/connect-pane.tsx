import React, { useState } from 'react';
import { getConnectedUsers, registerOnUserConnect, registerOnUserDisconnect } from '../../service/websocket';
import { FilesInput } from '../files-input/files-input';
import { ProfileIcon } from '../profile-icon/profile-icon';
import { Row } from '../row/row';

export const ConnectPane: React.FC = () => {
  const [connectedUsers, setConnectedUsers] = useState<any>(getConnectedUsers());

  registerOnUserConnect((data) => {
    setConnectedUsers([data]);
  })

  registerOnUserDisconnect(() => setConnectedUsers([]));

  const handleSend = file => {};

  return (
    <div>
      {connectedUsers.map(usr => (
        <Row>
          <ProfileIcon txt={usr} />
          <FilesInput onSend={handleSend} />
        </Row>
      ))}
    </div>
  );
};
