import { useContext } from "react";
import { Image, Icon, Button, List } from 'semantic-ui-react';
import { StoreContext } from '../index';
import { UserType } from '../types';
import * as Const from '../constants';

import './style.css';

interface Props {
  user: UserType;
  showRating: boolean;
  userBanned?: boolean;
  ratingCallback?: (uid: string, newRating: number) => void;
}

const UserItem: React.FC<Props> = props => {
  const { user, ratingCallback, showRating, userBanned } = props;
  const { username, avatar, uid, rating } = user;
  const { toggleModal, setControledUser, resetUser } = useContext(StoreContext);
  const userHasRating = typeof(rating) === 'number' && !isNaN(rating);
  const resetAvailable = userHasRating && (rating === 0) && showRating;
  const increaseRating = () => {
    const newRating = userHasRating ? rating + 1 : 1;
    setControledUser(user);
    ratingCallback(uid, newRating);
    if (newRating === Const.RATING_LIMITS.MAX) { toggleModal(true); }
  }

  const decreaseRating = () => {
    const newRating = userHasRating? rating - 1: -1;
    setControledUser(user);
    ratingCallback(uid, newRating);
    if (newRating === Const.RATING_LIMITS.MIN) { toggleModal(true); }
  }

  const reset = () => resetUser(uid);

  return (
    <List.Item className="user-item">
        <List.Content className="user-data">
          <Image src={avatar} avatar />{username}
          {resetAvailable &&
            <>&nbsp; <Icon name="trash" onClick={reset} /></>
          }
        </List.Content>
        <List.Content floated='right' className="rating-block">
          {(userHasRating && showRating) &&
            <span className="user-rating" data-testid="user-rating-count">{rating} &nbsp;</span>
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
