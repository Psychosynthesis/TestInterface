export type UserType = {
  username: string;
  uid: string;
  avatar: string;
  rating?: number;
  banned?: boolean;
}

export enum EventTag {
  NEW_RATED = "NEW_RATED",
  RATING_CHANGES = "RATING_CHANGES",
  BANNED = "BANNED",
  RESET = "RESET",
}
