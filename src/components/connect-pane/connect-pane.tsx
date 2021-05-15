import React from 'react';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { ProfileIcon } from '../profile-icon/profile-icon';
import { Row } from '../row/row';
import { Input } from '../input/input';

interface ConnectPaneProps {
  connectedUsers?: any[];
}

export const ConnectPane: React.FC<ConnectPaneProps> = ({ connectedUsers = [] }) => {
  return (
    <div>
      <Row>
        <ProfileIcon />
        <Input />
      </Row>
      {connectedUsers.map(usr => (
        <Row>
          <ProfileIcon />
        </Row>
      ))}
    </div>
  );
};
