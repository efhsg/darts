import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {Statuses} from '../models/game';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input() statusObvervable: Observable<Statuses>;
  protected timer: Observable<string>;
  private time: string;

  ngOnInit() {
    this.startTimer();
    this.statusObvervable.subscribe(
      {
        next: (v) => {
          if (v === Statuses.played) {
            this.stopTimer();
          }
        }
      }
    );
  }

  private startTimer() {
    this.timer = Observable.interval(1000)
      .map((seconds => {
          const sec = seconds % 60;
          const min = ((seconds - sec) / 60) % 60;
          const hour = (seconds - (min * 60) - sec) / (60 * 60);
          this.time = (hour < 10 ? ('0' + hour) : hour) + ':' +
            (min < 10 ? ('0' + min) : min) + ':' +
            (sec < 10 ? ('0' + sec) : sec);
          return this.time;
        })
      );
  }

  private stopTimer() {
    this.timer = Observable.of(this.time);
  }
}
