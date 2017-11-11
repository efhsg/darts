import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../models/game';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-spel',
  templateUrl: './spel.component.html',
  styleUrls: ['./spel.component.sass']
})
export class SpelComponent implements OnInit {

  @Input() game: Game;
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
    if (this.getActieveSpeler().puntenOver > 0) {
      this.volgendeSpeler();
    } else {
      this.gameAfgelopen = true;
    }
  }

  private verwerkScore(): boolean {
    const score = Number(this.keysPressed);
    const puntenOver = this.game.spelers[this.actieveSpeler].puntenOver - score;
    this.keysPressed = '';
    if (this.validerenScore(score, puntenOver)) {
      this.getActieveSpeler().puntenOver = puntenOver;
      return true;
    }
    return false;
  }

  private getActieveSpeler() {
    return this.game.spelers[this.actieveSpeler];
  }

  private validerenScore(score: number, puntenOver: number): boolean {
    if (score > 180) {
      this.openSnackBar('Een score van ' + score + ' ?', null);
      return false;
    }
    if (puntenOver < 2 && puntenOver !== 0) {
      this.openSnackBar('Je komt op ' + puntenOver + ' ?', null);
      return false;
    }
    return true;
  }

  private volgendeSpeler(): void {
    this.actieveSpeler = (this.actieveSpeler < this.game.spelers.length - 1) ? this.actieveSpeler + 1 : 0;
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
