import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  protected timer: Observable<string>;

  public counter$: Subject<number> = new Subject<number>();

  constructor() {
    this.counter$
      .scan((acc: number, current: number): number => acc + current)
      .map((value: number): string => `Som : ${value}`)
      .subscribe((click) => console.log(click));
  }

  ngOnInit() {
    this.timer = Observable.interval(1000)
      .map((seconds => {
          const sec = seconds % 60;
          const min = ((seconds - sec) / 60) % 60;
          const hour = (seconds - (min * 60) - sec) / (60 * 60);
          return (hour < 10 ? ('0' + hour) : hour) + ':' +
            (min < 10 ? ('0' + min) : min) + ':' +
            (sec < 10 ? ('0' + sec) : sec);
        })
      );
  }


}
