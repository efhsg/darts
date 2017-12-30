import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Game} from '../models/game';
import {MatSnackBar} from '@angular/material';
import {Speler} from '../models/speler';
import {Score} from '../models/score';

@Component({
  selector: 'app-spel',
  templateUrl: './spel.component.html',
  styleUrls: ['./spel.component.sass']
})
export class SpelComponent implements OnInit {

  @Input() game: Game;
  @Output() done = new EventEmitter();
  protected actieveSpeler = 0;

  protected keysPressed = '';
  protected gameAfgelopen = false;

  protected keypad = [
    [
      {icon: null},
      {icon: null},
      {icon: null},
    ],
    [
      {icon: null},
      {icon: null},
      {icon: null},
    ],
    [
      {icon: null},
      {icon: null},
      {icon: null},
    ],
    [
      {icon: 'backspace'},
      {icon: null},
      {icon: 'keyboard_return'},
    ]
  ];

  constructor(public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  protected pressKeypad(key: number): void {
    key = (key === 11) ? 0 : key;
    switch (key) {
      case 10:
        this.verwijderenLaatsteCijfer();
        break;
      case 12:
        this.afsluitenBeurt();
        break;
      default:
        this.toevoegenCijfer(key);
    }
  }

  private verwijderenLaatsteCijfer() {
    this.keysPressed = this.keysPressed.substr(0, this.keysPressed.length - 1);
  }

  private toevoegenCijfer(key: number) {
    this.keysPressed = this.keysPressed + String(key);
  }

  private afsluitenBeurt() {
    if (this.verwerkScore()) {
      this.doeActieNaAfsluitenBeurt();
    }
  }

  private doeActieNaAfsluitenBeurt() {
    if (this.getActieveSpeler().puntenOver.value > 0) {
      this.volgendeSpeler();
    } else {
      this.gameAfgelopen = true;
      this.done.emit();
    }
  }

  private verwerkScore(): boolean {
    const score = new Score(Number(this.keysPressed));
    this.keysPressed = '';
    if (!score.isValide()) {
      this.openSnackBar(score.score + ' is geen valide score!');
      return false;
    }
    this.getActieveSpeler().gooit(score);
    return true;
  }

  private getActieveSpeler(): Speler {
    return this.game.spelers[this.actieveSpeler];
  }

  private volgendeSpeler(): void {
    this.actieveSpeler = (this.actieveSpeler < this.game.spelers.length - 1) ? this.actieveSpeler + 1 : 0;
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
