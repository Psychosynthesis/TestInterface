import { EventTag } from './types';
import * as Const from './constants';

// data можно было бы и типизировать, но хочется побыстрее закончить уже
export const Logger = (event: EventTag, data?: any) => {
  console.log(Const.LOGS[event] + (data ?? ''));
}
