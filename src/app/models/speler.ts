export class Speler {
  private _naam: string;
  private _puntenOver: number;

  constructor(naam?: string) {
    this.naam = naam ? naam : '';
    this.puntenOver = 501;
  }

  get naam(): string {
    return this._naam;
  }

  set naam(value: string) {
    this._naam = value;
  }

  get puntenOver(): number {
    return this._puntenOver;
  }

  set puntenOver(value: number) {
    this._puntenOver = value;
  }
}
