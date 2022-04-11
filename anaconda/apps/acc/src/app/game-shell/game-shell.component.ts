import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
} from '@angular/forms';
import { filter, map, Observable, startWith, Subject, takeUntil, tap } from 'rxjs';
import { GameService } from '../game.service';
import { playValidator, setupValidator } from '../game.util';
import { defaultGamePlayForm, GameSetupForm, Turn } from '../models';

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
    player1Selection: null,
    player2Selection: null
        }, playValidator)
  

  private _destroying$ = new Subject<void>();

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
    this.gamePlayForm.valueChanges.pipe(
      takeUntil(this._destroying$),
      startWith(this.gamePlayForm.value),
      tap(value => {
        console.log('form value', value);
      }),
      filter(() => {
        return this.gamePlayForm.status === 'VALID'
      }),
      tap(formValue => {
        this.service.addTurn(formValue)
        this.gamePlayForm.setValue(defaultGamePlayForm)
        this.gamePlayForm.updateValueAndValidity({onlySelf: true, emitEvent: false});
        console.log('form val', formValue)

      })
  ).subscribe();

  }
  handlePlayGame(game: GameSetupForm) {
    this.service.startGame(game)
  }
  
  handleSave() {
    this.service.saveGame()
  }
  
  ngOnDestroy() {
    this._destroying$.next();
  }
}
