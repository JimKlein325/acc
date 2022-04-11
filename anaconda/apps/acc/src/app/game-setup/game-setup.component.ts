/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import {  Game, GameSetupForm } from '../models';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'acc-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:  GameSetupComponent,
      multi: true
    }
  ]
})
export class GameSetupComponent implements ControlValueAccessor, OnDestroy, OnChanges {
  @Input() enablePlay: boolean;
  @Input() currentGame: Game;
  @Output() playGame: EventEmitter<GameSetupForm> = new EventEmitter();
  @Output() save = new EventEmitter();

  form: FormGroup = new FormGroup({
      player1: new FormControl(''),
      player2: new FormControl(''),
      isPlayingComputer: new FormControl(false)
  });

  private _destroying$ = new Subject<void>();

  writeValue(v: GameSetupForm) {
      this.form.setValue(v, {emitEvent: false} );
  }

  registerOnChange(fn: any) {
    this.form.valueChanges
      .pipe(
        takeUntil(this._destroying$),
        tap(fn)
      )
      .subscribe();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOnTouched(fn: any) {}

  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  handlePlay() {
    this.playGame.emit(this.form.value)
  }

  handleSave() {
    this.save.emit()
  }

  toggleComputerPlay() {
    const toggledValue = this.form.get('isPlayingComputer')?.value ? '' : 'Computer Play';
    const p2 = this.form.get('player2')

    if( (p2.value as string).length >=0) {
      p2.setValue(toggledValue, {emitEvent: false} );
      p2.updateValueAndValidity({onlySelf: true, emitEvent: false});
      toggledValue ==='Computer Play' ? p2.disable({onlySelf: true, emitEvent: false}) : p2.enable({onlySelf: true,emitEvent: false});
    } 

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['enablePlay'] &&changes['enablePlay'].currentValue ){
      this.enablePlay = changes['enablePlay'].currentValue
    }
  }

  ngOnDestroy() {
    this._destroying$.next();
  }

}

