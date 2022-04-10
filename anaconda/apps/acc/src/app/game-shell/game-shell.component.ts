import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { filter, map, Observable, startWith, Subject, tap } from 'rxjs';
import { GameService } from '../game.service';
import { setupValidator } from '../game.util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'acc-games-shell',
  templateUrl: './game-shell.component.html',
  styleUrls: ['./game-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameShellComponent implements OnInit, OnDestroy  {
  games$ = this.service.games$;
  currentGame$ = this.service.currentGame$;
  enablePlay$: Observable<boolean>;

  gameSetupForm = new FormControl({
    player1: '',
    player2: '',
    isPlayingComputer: false,
  }, setupValidator)

  gamePlayForm = new FormControl({
    player1Selection: new FormControl([null, Validators.required]),
    player2Selection: new FormControl([null, Validators.required])
        })
  

  private _destroying$ = new Subject<void>();

  // setDisabledState(isDisabled: boolean) {
  //   isDisabled ? this.form.disable() : this.form.enable();
  // }
  constructor(private service: GameService) {}

  ngOnInit(): void {
    this.enablePlay$ = this.gameSetupForm.valueChanges.pipe(
      startWith(this.gameSetupForm.value),
      map(() =>  {
        const enable = this.gameSetupForm.status === 'VALID';
        this.gameSetupForm.updateValueAndValidity({onlySelf: true, emitEvent: false});
        return enable;
      })
    );


  }
  
  ngOnDestroy() {
    this._destroying$.next();
  }
}
