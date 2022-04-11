import { AbstractControl, FormGroup } from "@angular/forms";

export const setupValidator = (c: AbstractControl) : {[key: string]: boolean} | null => {
    const formGroup = c as FormGroup;
    const player1 = formGroup.value['player1'] as string;
    const player2 = formGroup.value['player2'] as string;
    const isPlayingComputer =  formGroup.value['isPlayingComputer'] as boolean;

    if(player1.length === 0 && player2.length===0 && !isPlayingComputer) {
        return { 'noSelections': true}
    }

    if(player1.length > 0 && !player2 && !isPlayingComputer) {
        return { 'p1NoP2OrComp': true}
    }

    if(!player1 && player2.length > 0 && !isPlayingComputer) {
        return { 'Nop1P2NoComp': true}
    }

    if(!player1 && isPlayingComputer) {
        return { 'NoP1Comp': true}
    }

    return null;
}
export const playValidator = (c: AbstractControl) : {[key: string]: boolean} | null => {
    const formGroup = c as FormGroup;
    
    const player1Selection = formGroup.value['player1Selection'];
    const player2Selection = formGroup.value['player2Selection'];

    if(player1Selection ===null && player2Selection===null){
        return { 'noSelection': true }
    }
    
    if(player1Selection>=0 && player2Selection===null){
        return { 'P1Selected': true }
    }
    
    if(player2Selection>=0 && player1Selection===null){
        return { 'P2Selected': true }
    }

    return null;
}
