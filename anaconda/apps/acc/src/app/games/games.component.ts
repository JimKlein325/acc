import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Game } from '../models';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'acc-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnChanges {
  @Input() games: Game[];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['games'] &&changes['games'].currentValue ){
      this.games = changes['games'].currentValue
    }
  }

}
