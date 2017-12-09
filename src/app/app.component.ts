import {Component, OnInit} from '@angular/core';
import {Game} from './models/game';
import {Speler} from './models/speler';
import {Spelstatus} from './spelstatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  protected title: string;
  protected spelstatus: Spelstatus;
  protected game: Game;

  ngOnInit(): void {
    this.game = new Game();
    this.nieuwSpel();
  }

  protected showSetup(): boolean {
    return this.spelstatus === Spelstatus.setup;
  }

  protected showSpel(): boolean {
    return this.spelstatus === Spelstatus.spel;
  }

  public setupDone(): void {
    this.spelstatus = Spelstatus.spel;
    this.title = 'game on';
  }

  protected nieuwSpel() {
    this.title = 'setup';
    this.spelstatus = Spelstatus.setup;
  }

}
