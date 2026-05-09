import { ICard, IUser } from 'lib';

export interface IDeck {
  id?: string;
  user: IUser;
  cards: ICard[];
}
