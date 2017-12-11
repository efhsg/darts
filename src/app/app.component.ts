import {Component, OnInit} from '@angular/core';
import {Game, Statuses} from './models/game';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  protected game: Game;
  protected statusObvervable: Subject<Statuses> = new Subject<Statuses>();

  ngOnInit(): void {
    this.game = new Game();
    this.nieuwSpel();
  }

  protected showSetup(): boolean {
    return this.game.status === Statuses.setup;
  }

  protected showSpel(): boolean {
    return (this.game.status === Statuses.gameon || this.game.status === Statuses.played);
  }

  public setupDone(): void {
    this.changeStatus(Statuses.gameon);
  }

  public gameDone(): void {
    this.changeStatus(Statuses.played);
  }

  protected nieuwSpel() {
    this.changeStatus(Statuses.setup);
  }

  private changeStatus(status: Statuses) {
    this.game.status = status;
    this.statusObvervable.next(this.game.status);
  }

}
