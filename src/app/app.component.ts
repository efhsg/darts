import {Component, OnInit} from '@angular/core';
import {Game} from './models/game';
import {Speler} from './models/speler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  protected message = 'Hello world!';

  protected game: Game;

  ngOnInit(): void {

    this.game = <Game>{
      legs: 1,
      spelers: []
    };
  }
}
