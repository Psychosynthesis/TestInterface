import { List, Tab } from 'semantic-ui-react';
import UserItem from '../user-item';
import { UserType } from '../types';

interface Props {
  ratedUsers: UserType[];
  bannedUsers: UserType[];
}

const RatedUsersList: React.FC<Props> = props => {
  const { bannedUsers, ratedUsers } = props;

  const panes = [
    {
      menuItem: 'Rated Users',
      render: () =>
        <List divided verticalAlign='middle' >
          {ratedUsers.map(
            user => <UserItem
                      showRating={true}
                      user={user}
                      key={user.uid}
                    />
          )}
        </List>
    },
    {
      menuItem: 'Banned',
      render: () =>
        <List divided verticalAlign='middle' >
          {bannedUsers.map(
            user => <UserItem
                      showRating={false}
                      userBanned={true}
                      user={user}
                      key={user.uid}
                    />
          )}
        </List>
    },
  ]

  return (
    <Tab panes={panes} />
  );
}

export default RatedUsersList;
