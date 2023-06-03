import { Image, Icon, Button, List } from 'semantic-ui-react';
import { UserType } from '../types';

import './style.css';

interface Props {
  user: UserType;
  showRating: boolean;
  ratingCallback: (uid: string, direction: boolean) => void;
  resetCallback?: (uid: string) => void;
}

const UserItem: React.FC<Props> = props => {
  const { user, ratingCallback, resetCallback, showRating } = props;
  const { username, avatar, uid, rating } = user;
  const userHasRating = typeof(rating) === 'number' && !isNaN(rating);
  const resetAvailable = userHasRating && (rating === 0) && showRating;
  const increaseRating = () => ratingCallback(uid, true);
  const decreaseRating = () => ratingCallback(uid, false);
  const resetUser = () => {
    if (resetCallback) resetCallback(uid);
  }

  return (
    <List.Item className="user-item">
        <List.Content className="user-data">
          <Image src={avatar} avatar />{username}
          {resetAvailable &&
            <>&nbsp; <Icon name="trash" onClick={resetUser} /></>
          }
        </List.Content>
        <List.Content floated='right'>
          {(userHasRating && showRating) &&
            <span className="user-rating">{rating} &nbsp;</span>
          }
          <Button
            size="mini"
            color='green'
            circular
            compact
            onClick={increaseRating}
          >+</Button>
          <Button
            size="mini"
            color='red'
            circular
            compact
            onClick={decreaseRating}
          >-</Button>
        </List.Content>
    </List.Item>
  );
}

export default UserItem;
