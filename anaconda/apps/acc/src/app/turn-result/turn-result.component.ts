/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  Input,} from '@angular/core';
import { Turn } from '../models';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'acc-turn-result',
  templateUrl: './turn-result.component.html',
  styleUrls: ['./turn-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TurnResultComponent {
  @Input() turnResult: Turn;

  // TODO replace with pipe
  applyWinnerStyle(player: number, selection: number): boolean {
    if (this.turnResult.outcome==='p1_wins'){
      if (player===1 && this.turnResult.player1Selection===selection){
        return true;
      }
    } else {
      if (player===2 && this.turnResult.player2Selection===selection){
        return true;
      } 
    }
    return false;
  }
  // TODO replace with pipe
  applyLooserStyle(player: number, selection: number): boolean {
    if (this.turnResult.outcome==='p2_wins'){
      if (player===1 && this.turnResult.player1Selection===selection){
        return true;
      }
    } else {
      if (player===2 && this.turnResult.player2Selection===selection){
        return true;
      } 
    }
    if(this.turnResult.outcome==='tie'){
      if(player===1 && selection===this.turnResult.player1Selection){
        return true;
      }
      if(player===2 && selection===this.turnResult.player2Selection){
        return true;
      }
    }

    return false;
  }
}
