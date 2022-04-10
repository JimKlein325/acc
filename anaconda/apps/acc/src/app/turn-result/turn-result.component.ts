/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
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
import { Turn, GamePlayForm } from '../models';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'acc-turn-result',
  templateUrl: './turn-result.component.html',
  styleUrls: ['./turn-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TurnResultComponent,
      multi: true
    }
  ]

})
export class TurnResultComponent {
  @Input() turnResult: Turn = {
    player1Selection: 2,
    player2Selection: 1,
    player1Won: true
  }


  // TODO replace with pipe
  applyWinnerStyle(player: number, selection: number): boolean {
    if (this.turnResult.player1Won){
      if (player===1&& this.turnResult.player1Selection===selection){
        return true;
      }
    } else {
      if (player===1 && selection===this.turnResult.player2Selection){
        return true;
      } 
    }
    return false;
  }
  // TODO replace with pipe
  applyLooserStyle(player: number, selection: number): boolean {
    if (!this.turnResult.player1Won){
      if (player===1 && this.turnResult.player1Selection===selection){
        return true;
      }
    } else {
      if (player===2 && selection===this.turnResult.player2Selection){
        return true;
      } 
    }
    return false;
  }
}
