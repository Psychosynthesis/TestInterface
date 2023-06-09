import { Button, List } from 'semantic-ui-react';
import UserItem from '../user-item';
import { UserType } from '../types';

import './style.css';

interface Props {
  users: UserType[];
  updateCallback: () => void;
  getNextCallback: () => void;
}

const AllUsersList: React.FC<Props> = props => {
  const {
    users,
    updateCallback,
    getNextCallback
  } = props;

  const renderList = users.map(user =>
    <UserItem
      user={user}
      showRating={false}
      key={user.uid}
    />
  );

  return (
    <List divided verticalAlign="middle">
      <List.Header className="all-users-header">
        <Button icon='sync' onClick={updateCallback} data-testid="update-button" content="Update" />
        <Button onClick={getNextCallback} data-testid="next-button" content="Next" />
      </List.Header>
      {renderList}
    </List>
  );
}

export default AllUsersList;
