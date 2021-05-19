import React, { useState } from 'react';
import { getConnectedUsers, registerOnUserConnect, registerOnUserDisconnect } from '../../service/websocket';
import { ProfileIcon } from '../profile-icon/profile-icon';
import { Row } from '../row/row';

export const ConnectPane: React.FC = () => {
  const [connectedUsers, setConnectedUsers] = useState<any>(getConnectedUsers());

  registerOnUserConnect((data) => {
    setConnectedUsers([data]);
  })

  registerOnUserDisconnect(() => setConnectedUsers([]));

  return (
    <div>
      {connectedUsers.map(usr => (
        <Row>
          <ProfileIcon txt={usr} />
        </Row>
      ))}
    </div>
  );
};
