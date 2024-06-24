class TicTacToeGame {
    constructor(player = 1) {  // デフォルトは先行とします
        this.currentState = Array(9).fill(0);
        this.currentPlayer = player;
    }

    makeMove(index) {
        if (this.currentState[index] === 0) {
            this.currentState[index] = this.currentPlayer;
            return true;
        }
        return false;
    }

    switchPlayer() {
        this.currentPlayer = -this.currentPlayer;
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.currentState[a] !== 0 &&
                this.currentState[a] === this.currentState[b] &&
                this.currentState[a] === this.currentState[c]) {
                return true;
            }
        }
        return false;
    }

    isBoardFull() {
        return !this.currentState.includes(0);
    }

    getCurrentState() {
        return [...this.currentState];
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    restartGame() {
        this.currentState = Array(9).fill(0);
        this.currentPlayer = 1;
    }
}

export { TicTacToeGame };
