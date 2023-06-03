import { Image, Icon, Button, List } from 'semantic-ui-react';
import { UserType } from '../types';

import './style.css';

interface Props {
  user: UserType;
  showRating: boolean;
  userBanned?: boolean;
  ratingCallback?: (uid: string, newRating: number) => void;
  resetCallback?: (uid: string) => void;
}

const UserItem: React.FC<Props> = props => {
  const { user, ratingCallback, resetCallback, showRating, userBanned } = props;
  const { username, avatar, uid, rating } = user;
  const userHasRating = typeof(rating) === 'number' && !isNaN(rating);
  const resetAvailable = userHasRating && (rating === 0) && showRating;
  const increaseRating = () => ratingCallback(uid, userHasRating ? rating + 1 : 1);
  const decreaseRating = () => ratingCallback(uid, userHasRating? rating - 1: -1);
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
        <List.Content floated='right' className="rating-block">
          {(userHasRating && showRating) &&
            <span className="user-rating">{rating} &nbsp;</span>
          }
          {!userBanned &&
            <>
              <Button
                icon="plus"
                size="mini"
                color='green'
                circular
                basic
                onClick={increaseRating}
              />
              <Button
                icon="minus"
                size="mini"
                color='red'
                circular
                basic
                onClick={decreaseRating}
              />
            </>
          }
        </List.Content>
    </List.Item>
  );
}

export default UserItem;
