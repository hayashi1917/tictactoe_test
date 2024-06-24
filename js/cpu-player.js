class CPUPlayer {
    getBestMove(state) {
        return this.minimax(state, 1).index;
    }

    minimax(state, player) {
        let availSpots = this.emptyIndices(state);

        if (this.winning(state, -1)) {
            return {score: -10};
        } else if (this.winning(state, 1)) {
            return {score: 10};
        } else if (availSpots.length === 0) {
            return {score: 0};
        }

        let moves = [];

        for (let i = 0; i < availSpots.length; i++) {
            let move = {};
            move.index = availSpots[i];
            state[availSpots[i]] = player;

            if (player === 1) {
                let result = this.minimax(state, -1);
                move.score = result.score;
            } else {
                let result = this.minimax(state, 1);
                move.score = result.score;
            }

            state[availSpots[i]] = 0;
            moves.push(move);
        }

        let bestMove;
        if (player === 1) {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }

    emptyIndices(state) {
        return state.map((cell, index) => cell === 0 ? index : null).filter(val => val !== null);
    }

    winning(board, player) {
        if (
            (board[0] === player && board[1] === player && board[2] === player) ||
            (board[3] === player && board[4] === player && board[5] === player) ||
            (board[6] === player && board[7] === player && board[8] === player) ||
            (board[0] === player && board[3] === player && board[6] === player) ||
            (board[1] === player && board[4] === player && board[7] === player) ||
            (board[2] === player && board[5] === player && board[8] === player) ||
            (board[0] === player && board[4] === player && board[8] === player) ||
            (board[2] === player && board[4] === player && board[6] === player)
        ) {
            return true;
        } else {
            return false;
        }
    }
}

export { CPUPlayer };
