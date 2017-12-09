import {OutshotCalculatorAbstract} from '../services/interfaces/outshot.calculator';

export class Speler {
  private _naam: string;
  private _puntenOver: number;

  constructor(private outshotCalculator: OutshotCalculatorAbstract, puntenOver: number, naam?: string) {
    this.naam = naam ? naam : '';
    this.puntenOver = puntenOver;
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

  get uitgooiOpties(): string {
    return this.outshotCalculator.uitgooiOpties(this.puntenOver);
  }

}
