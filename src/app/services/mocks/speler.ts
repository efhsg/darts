import {SpelerServiceAbstract} from '../interfaces/speler';
import {Observable} from 'rxjs/Observable';
import {Speler} from '../../models/speler';
import {SPELERS} from './data/spelers';

export class SpelerServiceMock extends SpelerServiceAbstract {

  private spelers: Speler[] = [];

  public fetchAll(): Observable<Speler[]> {
    this.spelers = (this.spelers.length === 0) ? SPELERS : this.spelers;
    return Observable.of(this.spelers);
  }

  public fetch(naam: string): Observable<Speler> {
    return null;
  }

  public save(spelers: Speler[]): void {
    const spelersNamen = this.getSpelersNamen();
    for (const speler of spelers) {
      if (!spelersNamen.includes(speler.naam)) {
        this.spelers.push(<Speler>{'naam': speler.naam});
      }
    }
  }

  private getSpelersNamen(): String[] {
    const spelersNamen = [];
    for (const speler of this.spelers) {
      spelersNamen.push(speler.naam);
    }
    return spelersNamen;
  }
}
