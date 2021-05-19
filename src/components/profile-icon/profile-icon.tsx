import { createPeerConnection } from '../../service/peer-connection';
import './profile-icon.css';

interface ProfileProps {
  txt?: string;
}

export const ProfileIcon: React.FC<ProfileProps> = ({ txt }) => {
  const handleOnClickProfile = (evt: any) => {
    console.log('Creating peer...');
    createPeerConnection();
  };
  return (
    <div className="profile-icon" onClick={handleOnClickProfile}>
      {txt?.charAt(0) || 'NA'}
    </div>
  );
};
