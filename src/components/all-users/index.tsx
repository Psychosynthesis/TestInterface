import { Button, List } from 'semantic-ui-react';
import UserItem from '../user-item';
import { UserType } from '../types';

import './style.css';

interface Props {
  users: UserType[];
  ratingChangeCallback: (uid: string, newRating: number) => void;
  updateCallback: () => void;
  getNextCallback: () => void;
}

const AllUsersList: React.FC<Props> = props => {
  const {
    users,
    ratingChangeCallback,
    updateCallback,
    getNextCallback
  } = props;

  const renderList = users.map(
    user => <UserItem
              user={user}
              showRating={false}
              key={user.uid}
              ratingCallback={ratingChangeCallback}
            />
  );

  return (
    <List divided verticalAlign="middle">
      <List.Header className="all-users-header">
        <Button icon='sync' onClick={updateCallback}>Update</Button>
        <Button onClick={getNextCallback}>Next</Button>
      </List.Header>
      {renderList}
    </List>
  );
}

export default AllUsersList;
