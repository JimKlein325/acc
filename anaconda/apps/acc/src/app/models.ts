export interface Game {
    player1: string;
    player2: string;
    isPlayingComputer: boolean;
    player1Score: number;
    player2Score: number;
    turns: Turn[]
}

export type GameSetupForm = Omit<Game, 'turns' | 'player1Score'| 'player2Score'>
export type GamePlayForm = Omit<Turn, 'player1Won'>

export interface Turn {
    player1Selection: number;
    player2Selection: number;
    player1Won: boolean;
}

export const defaultGame: Game = {
    player1: '',
    player2: '',
    isPlayingComputer: false,
    player1Score: 0,
    player2Score: 0,
    turns: []
}

export const defaultGameSetupForm: GameSetupForm = {
    player1: '',
    player2: '',
    isPlayingComputer: false
}

export const defaultGamePlayForm: GamePlayForm = {
    player1Selection: 0,
    player2Selection: 0,
}

