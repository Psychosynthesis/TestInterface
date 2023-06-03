import { List, Tab } from 'semantic-ui-react';
import UserItem from '../user-item';
import { UserType } from '../types';

interface Props {
  ratedUsers: UserType[];
  bannedUsers: UserType[];
  ratingChangeCallback: (uid: string, direction: boolean) => void;
  resetUserCallback: (uid: string) => void;
}

const RatedUsersList: React.FC<Props> = props => {
  const { ratedUsers, ratingChangeCallback, resetUserCallback } = props;
  const renderList = ratedUsers.map(
    user => <UserItem
              showRating={true}
              user={user}
              key={user.uid}
              ratingCallback={ratingChangeCallback}
              resetCallback={resetUserCallback}
            />
  );

  const panes = [
    {
      menuItem: 'Rated Users',
      render: () =>
      <List divided verticalAlign='middle' >
          {renderList}
      </List>
    },
    { menuItem: 'Banned', render: () => <Tab.Pane>Banned users</Tab.Pane> },
  ]

  return (
    <Tab panes={panes} />
  );
}

export default RatedUsersList;
