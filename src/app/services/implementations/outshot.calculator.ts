import {Injectable} from '@angular/core';
import {OutshotCalculatorAbstract} from '../interfaces/outshot.calculator';

@Injectable()
export class OutshotCalculator extends OutshotCalculatorAbstract {

  private static selecteerBesteCheckout(checkouts: number[][]): number[] {
    for (let i = 0; i < checkouts.length; i++) {
      checkouts[i] = checkouts[i].filter((worpScore) => Number(worpScore));
    }

    // checkouts met minste aantal pijlen eerst, daarna de checkout met meeste singles, daarna checkout met beste dubbel
    checkouts = checkouts.sort((a, b) => {
      return a.length - b.length
        || this.aantalSingles(b.slice(0, -1)) - this.aantalSingles(a.slice(0, -1))
        || this.kerenDeelbaarDoorTwee(b[b.length - 1]) - this.kerenDeelbaarDoorTwee(a[a.length - 1]);
    });

    return checkouts[0];
  }

  private static aantalSingles(scores: number[]) {
    let aantalSingles = 0;
    for (let i = 0; i < scores.length; i++) {
      if (this.isSingle(scores[i])) {
        aantalSingles++;
      }
    }
    return aantalSingles;
  }

  private static isSingle(score: number) {
    return score <= 20 && score >= 1;
  }

  private static kerenDeelbaarDoorTwee(score: number): number {
    let kerenGedeeldDoorTwee = 0;
    while (score > 2 && score % 2 === 0) {
      score /= 2;
      kerenGedeeldDoorTwee++;
    }
    return kerenGedeeldDoorTwee;
  }

  private static isUitTeGooien(score: number): boolean {
    return score % 2 === 0 && score >= 2 && score <= 40 || score === 50;
  }

  private static scoreBeurtAfkorting(checkout: number[]): string {
    let checkoutAfkorting = '';

    for (let i = 0; i < checkout.length - 1; i++) {
      if (checkout[i] !== 0) {
        checkoutAfkorting += this.scoreWorpAfkorting(checkout[i]) + ', ';
      }
    }

    checkoutAfkorting += this.scoreWorpAfkorting(checkout[checkout.length - 1], true);

    return checkoutAfkorting;
  }

  private static scoreWorpAfkorting(score: number, isOutshotDart = false): string {
    if (score > 60 || score < 1) {
      return '';
    }

    if (isOutshotDart) {
      if (score === 50) {
        return 'BE'; // Bulls-eye
      }

      if (score % 2 === 0) {
        return 'D' + (score / 2).toString(); // D = double
      }
    } else {
      if (score === 50) {
        return 'BE'; // Bulls-eye
      }

      if (score === 25) {
        return 'SB'; // Single-bull
      }

      if (score <= 20) {
        return score.toString();
      }

      if (score % 2 === 0 && score <= 40) {
        return 'D' + (score / 2).toString(); // D = double
      }

      if (score % 3 === 0 && score <= 60) {
        return 'T' + (score / 3).toString(); // T = triple
      }
    }

    throw new Error('Ongeldige score.');
  }

  private static alleMogelijkeBeurtScores(): Map<number, number[][]> {
    let bordScores = this.alleMogelijkeBordScores();
    bordScores = bordScores.sort((a, b) => (b - a));

    const checkouts = new Map<number, number[][]>();
    let score;

    for (let i = 0; i < bordScores.length; i++) {
      for (let j = 0; j < bordScores.length; j++) {
        for (let k = 0; k < bordScores.length; k++) {
          if (!this.isUitTeGooien(bordScores[k])) {
            continue;
          }

          score = bordScores[i] + bordScores[j] + bordScores[k];

          // Geen bestaande checkouts voor deze score. Prepareer met een lege array
          if (typeof checkouts.get(score) === 'undefined') {
            checkouts.set(score, []);
          }

          checkouts.get(score).push([bordScores[i], bordScores[j], bordScores[k]]);
        }
      }
    }

    return checkouts;
  }

  private static alleMogelijkeBordScores(): number[] {
    const bordScores = [];

    bordScores.push(0);
    bordScores.push(25);
    bordScores.push(50);
    for (let i = 1; i <= 20; i++) {
      bordScores.push(i);
      bordScores.push(i * 2);
      bordScores.push(i * 3);
    }

    return bordScores.filter((x, i, a) => bordScores.indexOf(x) === i);
  }

  public uitgooiOpties(puntenOver: number): string {
    const checkouts = OutshotCalculator.alleMogelijkeBeurtScores().get(puntenOver);
    if (typeof checkouts === 'undefined') {
      return 'Geen outshot';
    }
    return OutshotCalculator.scoreBeurtAfkorting(OutshotCalculator.selecteerBesteCheckout(checkouts));
  }
}
