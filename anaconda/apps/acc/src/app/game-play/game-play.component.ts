/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
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
import { GamePlayForm } from '../models';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'acc-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:  GamePlayComponent,
      multi: true
    }
  ]

})
export class GamePlayComponent implements ControlValueAccessor, OnDestroy, OnChanges {
  @Input() enablePlay: boolean ;

  form: FormGroup = new FormGroup({
    player1Selection: new FormControl(0),
    player2Selection: new FormControl(0),
});

private _destroying$ = new Subject<void>();

writeValue(v: GamePlayForm) {
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

ngOnChanges(changes: SimpleChanges): void {
  if(changes['enablePlay'] &&changes['enablePlay'].currentValue ){
    this.enablePlay = changes['enablePlay'].currentValue
  }
}

ngOnDestroy() {
  this._destroying$.next();
}
}
