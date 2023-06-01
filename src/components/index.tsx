import { Header } from 'semantic-ui-react';
import AllUsersList from './allusers';
import './style.css';

const UsersList: React.FC = () => {
  return (
    <div className="userslist">
      <Header as='h2' className="userslist-header">
        Users rating list
      </Header>
      <div className="lists-panel">
        <div className="all-users">
          <AllUsersList />
        </div>
        <div className="rated-users">
        </div>
      </div>
    </div>
  );
}

export default UsersList;
