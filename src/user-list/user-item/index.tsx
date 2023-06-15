import { useContext } from "react";
import { Image, Icon, Button, List } from 'semantic-ui-react';
import { StoreContext } from '../index';
import { UserType } from '../types';
import {
  useIncreaseRating,
  useDecreaseRating,
  useReset,
  useHasRating
} from './hooks';

import './style.css';

interface Props {
  user: UserType;
  showRating: boolean;
  userBanned?: boolean;
}

const UserItem: React.FC<Props> = props => {
  const { user, showRating, userBanned } = props;
  const { username, avatar, rating } = user;
  const store = useContext(StoreContext);
  const userHasRating = useHasRating(rating);

  // Выносим бизнес-логику в хуки
  // Кастомный хук нужен, т.к. колбэки хранятся с помощью useContext
  const increaseCallback = useIncreaseRating(user, store);
  const decreaseCallback = useDecreaseRating(user, store);
  const resetCallback = useReset(user, store);

  const resetAvailable = userHasRating && (rating === 0) && showRating;

  return (
    <List.Item className="user-item">
        <List.Content className="user-data">
          <Image src={avatar} avatar />{username}
          {resetAvailable &&
            <>&nbsp; <Icon name="trash" onClick={resetCallback} /></>
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
                onClick={increaseCallback}
              />
              <Button
                icon="minus"
                size="mini"
                color='red'
                circular
                basic
                onClick={decreaseCallback}
              />
            </>
          }
        </List.Content>
    </List.Item>
  );
}

export default UserItem;
