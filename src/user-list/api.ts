import { UserType } from './types';
import * as Const from './constants';

export const fetchData = async (
  updateUsersCallback: Function,
  getNext: boolean
) => {
  const url = getNext ? Const.API_URL + '&page=N' : Const.API_URL;
  const response = await fetch(url);
  const json: UserType[] = await response.json();
  updateUsersCallback(json);
}
