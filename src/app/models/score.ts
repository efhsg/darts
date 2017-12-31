export class Score {

  constructor(public readonly score: number) {
    this.score = score;
  }

  public isValide(): boolean {
    return this.score >= 0 && this.score <= 180;
  }
}
