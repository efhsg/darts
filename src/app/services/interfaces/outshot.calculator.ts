export interface OutshotCalculatorInterface {
  uitgooiOpties(puntenOver: number): string;
}

export abstract class OutshotCalculatorAbstract implements OutshotCalculatorInterface {
  uitgooiOpties(puntenOver: number): string {
    return null;
  }
}
