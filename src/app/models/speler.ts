export class Speler {
  private _naam: string;

  constructor(naam?: string) {
    this._naam = naam ? naam : '';
  }

  get naam(): string {
    return this._naam;
  }

  set naam(value: string) {
    this._naam = value;
  }
}
