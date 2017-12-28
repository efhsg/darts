export interface OutshotCalculatorInterface {
  uitgooiOpties(puntenOver: number): string;
}

export abstract class OutshotCalculatorAbstract implements OutshotCalculatorInterface {
  public abstract uitgooiOpties(puntenOver: number): string;
}
