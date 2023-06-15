import { EventTag, UserType } from './types';
import * as Const from './constants';

// data можно было бы и типизировать, но хочется побыстрее закончить
export const Logger = (event: EventTag, data?: any) => {
  console.log(Const.LOGS[event] + (data ?? ''));
}

export const updateRating = (
  uid: string,
  newRating: number,
  allUsers: UserType[],
) => {
  const userToUpdate = allUsers.find(user => user.uid === uid);
  userToUpdate.rating = newRating;
  return allUsers.filter(user => (user.uid === uid) ? userToUpdate : user);
}
