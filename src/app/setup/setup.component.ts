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
    this.buildForm();
    this.initGameSpelers();
    this.initSpelersLijst();
    this.setFormValues();
    this.addFormEvents();
  }

  private initGameSpelers() {
    if (isNullOrUndefined(this.game.spelers)) {
      this.game.spelers = [];
      this.addGameSpeler();
    }
  }

  private addGameSpeler() {
    this.game.spelers.push(new Speler(this.game.puntenPerGame, ''));
  }

  protected buildForm(): void {
    this.formMain = this.formBuilder.group({
      puntenPerGame: [501],
      spelers: this.formBuilder.array([]),
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
    for (const speler of this.game.spelers) {
      this.addSpeler(speler.naam);
    }
  }

  get spelers(): FormArray {
    return <FormArray>this.formMain.get('spelers') as FormArray;
  }

  protected buildSpeler(naam?: string): FormGroup {
    return this.formBuilder.group(
      {
        naam: [naam]
      });
  }

  protected addSpeler(naam?: string): void {
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
    this.setValidations();
    if (this.formMain.valid) {
      this.game.puntenPerGame = this.formMain.get('puntenPerGame').value;
      this.game.spelers = [];
      this.spelers.controls.forEach((formControl) => {
        this.game.spelers.push(new Speler(this.game.puntenPerGame, formControl.value.naam));
      });
      if (this.formMain.get('willekeurigeVolgorde').value) {
        this.game.shuffleSpelers();
      }
      this.spelerServiceAbstract.save(this.game.spelers);
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

  private setValidations() {
    this.spelers.controls.forEach((control, index) => {
      control.get('naam').setValidators([Validators.required]);
      control.get('naam').updateValueAndValidity();
      control.get('naam').markAsTouched();
    });
  }

}
