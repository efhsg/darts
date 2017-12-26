import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {Game} from '../models/game';
import {Speler} from '../models/speler';
import {OutshotCalculatorAbstract} from '../services/interfaces/outshot.calculator';
import {SpelerServiceAbstract} from '../services/interfaces/speler';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css', './setup.component.sass']
})
export class SetupComponent implements OnInit {

  @Input() game: Game;
  @Output() done = new EventEmitter();

  protected formMain: FormGroup;
  private aantalSpelersDefault = 1;

  protected spelersLijst: Speler[];
  protected spelersLijstReady = false;

  protected validationMessages = {
    'naam': {
      'required': 'Vul een naam in',
    },
  };

  private static markIfInvalid(control: AbstractControl) {
    if (control.invalid) {
      control.markAsTouched();
      control.markAsDirty();
    }
  }

  constructor(protected formBuilder: FormBuilder,
              protected outshotCalculator: OutshotCalculatorAbstract,
              protected spelerServiceAbstract: SpelerServiceAbstract) {
  }

  ngOnInit() {
    this.initSpelersLijst();
    if (isNullOrUndefined(this.game.spelers)) {
      this.game.spelers = [
        new Speler(this.outshotCalculator, this.game.puntenPerGame, '')
      ];
    }
    this.buildForm();
    this.setFormValues();
    this.addFormEvents();
  }

  protected buildForm(): void {
    this.formMain = this.formBuilder.group({
      puntenPerGame: [501],
      spelers: this.formBuilder.array([]
      ),
      tijdslimiet: [15],
      willekeurigeVolgorde: true,
    });
  }

  private setFormValues() {
    this.addSpelers();
    if (!isNullOrUndefined(this.game.puntenPerGame)) {
      this.formMain.patchValue({puntenPerGame: this.game.puntenPerGame});
    }
  }

  private addFormEvents() {
  }

  private initSpelersLijst(): void {
    this.spelerServiceAbstract.fetchAll().subscribe(
      (spelersLijst) => {
        this.spelersLijst = spelersLijst;
        this.spelersLijstReady = true;
      }
    );
  }

  private addSpelers() {
    if (this.game.spelers.length > 0) {
      for (const speler of this.game.spelers) {
        this.addSpeler(speler.naam);
      }
    } else {
      for (let i = 0; i < this.aantalSpelersDefault; i++) {
        this.addSpeler();
      }
    }
  }

  get spelers(): FormArray {
    return <FormArray>this.formMain.get('spelers') as FormArray;
  }

  protected buildSpeler(naam?: string): FormGroup {
    return this.formBuilder.group(
      {
        naam: [naam, Validators.required]
      });
  }

  protected addSpeler(naam?: string): void {
    naam = naam ? naam : 'Speler ' + (this.spelers.length + 1);
    this.spelers.push(this.buildSpeler(naam));
  }

  protected deleteSpeler(spelerId: number) {
    this.spelers.removeAt(spelerId);
  }

  protected getControlErrors(controlName: string, controlNameErrorReference?): string {
    controlNameErrorReference = !isNullOrUndefined(controlNameErrorReference)
      ? controlNameErrorReference
      : controlName;
    const errors = this.formMain.get(controlName).errors;
    let controlError = '';
    if (!isNullOrUndefined(errors)) {
      const error = Object.keys(errors)[0];
      controlError = this.validationMessages[controlNameErrorReference][error];
    }
    return controlError;
  }

  protected isInvalidControl(fieldName: string): boolean {
    const element = this.formMain.get(fieldName);
    return (element.invalid && element.touched);
  }

  protected next(): void {
    if (this.formMain.valid) {
      this.game.puntenPerGame = this.formMain.get('puntenPerGame').value;
      this.game.spelers = [];
      this.spelers.controls.forEach((formControl) => {
        this.game.spelers.push(new Speler(this.outshotCalculator, this.game.puntenPerGame, formControl.value.naam));
      });
      if (this.formMain.get('willekeurigeVolgorde').value) {
        this.game.shuffleSpelers();
      }
      this.done.emit();
    } else {
      this.showFormerrors();
    }
  }

  protected showFormerrors() {
    Object.keys(this.formMain.controls).forEach(key => {
      SetupComponent.markIfInvalid(this.formMain.get(key));
    });
  }

}
