import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { defaultGame, defaultTurn, Game, GameSetupForm, RawTurn, Turn, TurnOutcome } from './models';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _currentGame: Game = defaultGame;

  private _games: Game[] = [];

  private _games$ = new BehaviorSubject<Game[]>([])

  games$ = this._games$.asObservable()

  private _currentGame$ = new BehaviorSubject<Game>(defaultGame) 

  currentGame$ = this._currentGame$.asObservable();

  saveGame$ = new Subject<void>();

  save$ = this.saveGame$.asObservable();

   startGame({player1, player2, isPlayingComputer}: GameSetupForm): void {
     this._currentGame = {...this._currentGame, player1, player2, isPlayingComputer }
     this._currentGame$.next(this._currentGame)
   }

   getOutcome(difference: number): TurnOutcome {
    if (0 < difference ) {
      return 'p1_wins';
    } else {
      return 'p2_wins'
    }

   }

   addTurn({player1Selection, player2Selection}: RawTurn) {
      const difference = player1Selection - player2Selection

      let outcome: TurnOutcome;

      switch (difference) {
        case 2:
          outcome = 'p2_wins';
          break;
        case -2:
          outcome ='p1_wins';
          break;
        case 0:
          outcome ='tie';
          break;
        default:
          outcome = this.getOutcome(difference)
          break; 
      }
    const turn: Turn = {player1Selection, player2Selection, outcome}
    const newTurns = [...this._currentGame.turns]
    newTurns.unshift(turn as Turn);
    this._currentGame.turns = newTurns;
    this._currentGame$.next(this._currentGame)
   }

   // handle new game

   //handle save game
   saveGame(): void {
    const gameArrayLength = this._games.length;
    const updateGameId = {...this._currentGame, id: 'Game'+gameArrayLength};
    const newArray = [...this._games];
    newArray.unshift(updateGameId);
    this._games = newArray;
    this._games$.next(this._games)
   }
}
