import {Observable} from 'rxjs/Observable';
import {Speler} from '../../models/speler';

export abstract class SpelerServiceAbstract {
  public abstract fetchAll(): Observable<Speler[]>;

  public abstract fetch(naam: string): Observable<Speler>;

  public abstract save(spelers: Speler[]): void;
}
