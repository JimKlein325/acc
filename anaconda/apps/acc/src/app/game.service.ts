import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { defaultGame, Game } from './models';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _games$ = new BehaviorSubject<Game[]>([]);
  games$ = this._games$;

  private _currentGame$ = new BehaviorSubject<Game>(defaultGame);
  currentGame$ = this._currentGame$;

  constructor() {
    //initialize current game

   }

   // handle play game

   // handle new game

   //handle save game
}
