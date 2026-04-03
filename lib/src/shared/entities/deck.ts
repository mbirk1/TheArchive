import { ICard } from 'lib';

export interface IDeck {
  id?: string;
  userId: string;
  cards: ICard[];
}
