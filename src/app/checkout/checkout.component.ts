import {Component, Input, OnInit} from '@angular/core';
import {OutshotCalculatorAbstract} from '../services/interfaces/outshot.calculator';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() score: Observable<number>;

  public checkoutOption: string;

  constructor(
    private outshotService: OutshotCalculatorAbstract
  ) {
  }

  ngOnInit() {
    this.score.subscribe(score => {
      this.checkoutOption = this.outshotService.uitgooiOpties(score);
    });
  }
}
