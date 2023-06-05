import { EventTag } from './types';

export const API_URL = "https://random-data-api.com/api/users/random_user?size=8";

export const RATING_LIMITS = {
  MAX: 5,
  MIN: -5
};


export const LOGS = {
  [EventTag.NEW_RATED]: 'Новый пользователь добавлен в рейтинг: ',
  [EventTag.RATING_CHANGES]: 'Изменён рейтинг пользователя: ',
  [EventTag.BANNED]: 'Пользователь забанен: ',
  [EventTag.RESET]: 'Пользовател вознаграждён: ',
}
