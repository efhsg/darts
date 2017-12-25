import {SpelerServiceAbstract} from '../interfaces/speler';
import {Observable} from 'rxjs/Observable';
import {Speler} from '../../models/speler';
import {SPELERS} from './data/spelers';

export class SpelerServiceMock extends SpelerServiceAbstract {

  public fetchAll(): Observable<Speler[]> {
    return Observable.of(SPELERS);
  }

  public fetch(naam: string): Observable<Speler> {
    return null;
  }
}
