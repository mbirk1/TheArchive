import { Injectable } from '@nestjs/common';

@Injectable()
export class ScryfallRepository {

  constructor() {
    this.auth();
  }

  private auth() {

  }

  searchByName(name: string): Promise<Card[]> {

  }
}