import * as Const from '../constants';
import { UserType, StoreType } from '../types';

export const useHasRating = (rating?: number) => typeof(rating) === 'number' && !isNaN(rating);

export const useIncreaseRating = (
  user: UserType,
  store: StoreType,
) => () => {
  const { toggleModal, changeRating, setControledUser } = store;
  const { uid, rating } = user;
  const newRating = useHasRating(rating) ? rating + 1 : 1;
  setControledUser(user);
  changeRating(uid, newRating);
  if (newRating === Const.RATING_LIMITS.MAX) { toggleModal(true); }
};


export const useDecreaseRating = (
  user: UserType,
  store: StoreType,
) => () => {
  const { toggleModal, changeRating, setControledUser } = store;
  const { uid, rating } = user;
  const newRating = useHasRating(rating) ? rating - 1: -1;  setControledUser(user);
  setControledUser(user);
  changeRating(uid, newRating);
  if (newRating === Const.RATING_LIMITS.MIN) { toggleModal(true); }
}

export const useReset = (
  user: UserType,
  store: StoreType,
) => () => {
  const { resetUser } = store;
  const { uid } = user;
  resetUser(uid);
}
