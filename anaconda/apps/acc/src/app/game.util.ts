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
