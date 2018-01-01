import {Speler} from './speler';

export enum Statuses {
  setup = 'setup',
  gameon = 'gameon',
  played = 'played'
}

export class Game {
  public puntenPerGameOpties: number[] = [301, 501];
  public spelers: Speler[];
  public puntenPerGame: number;
  public willekeurigeVolgorde: boolean;
  public status: Statuses;

  public shuffleSpelers() {
    let i = 0;
    let j = 0;
    let temp = null;

    for (i = this.spelers.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.spelers[i];
      this.spelers[i] = this.spelers[j];
      this.spelers[j] = temp;
    }
  }


}
