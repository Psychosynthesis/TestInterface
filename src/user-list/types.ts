export type UserType = {
  username: string;
  uid: string;
  avatar: string;
  rating?: number;
  banned?: boolean;
}

export type StoreType = {
  toggleModal: Function,
  setControledUser: Function,
  changeRating: (uid: string, newRating: number) => void,
  resetUser: (uid: string) => void,
  banUser: (uid: string) => void,
}

export enum EventTag {
  NEW_RATED = "NEW_RATED",
  RATING_CHANGES = "RATING_CHANGES",
  BANNED = "BANNED",
  RESET = "RESET",
}
