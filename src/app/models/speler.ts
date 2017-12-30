import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Score} from './score';

@Injectable()
export class Speler {
  public puntenOver: BehaviorSubject<number>;

  constructor(
    private startScore: number,
    public naam?: string,
  ) {
    this.puntenOver = <BehaviorSubject<number>>new BehaviorSubject(startScore);
  }

  public gooit(score: Score) {
    if (this.puntenOver.value - score.score >= 0) {
      this.puntenOver.next(this.puntenOver.value - score.score);
    }
  }
}
