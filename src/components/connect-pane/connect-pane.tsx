import React from 'react';
import { ProfileIcon } from '../profile-icon/profile-icon';
import { Row } from '../row/row';

interface ConnectPaneProps {
  connectedUsers?: any[];
}

export const ConnectPane: React.FC<ConnectPaneProps> = ({ connectedUsers = [] }) => {
  return (
    <div>
      <Row>
        <ProfileIcon />
      </Row>
      {connectedUsers.map(usr => (
        <Row>
          <ProfileIcon />
        </Row>
      ))}
    </div>
  );
};
