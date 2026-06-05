import { ICard, IUser } from 'lib';

export interface ICollection {
  id?: string;
  user: IUser;
  cards: ICard[];
}
