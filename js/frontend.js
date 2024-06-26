import { CPUPlayer } from './cpu-player.js';
import { TicTacToeGame } from './game-logic.js';

document.addEventListener('DOMContentLoaded', function() {
    class TicTacToeUI {
        constructor() {
            this.board = document.getElementById('board');
            this.message = document.getElementById('message');
            this.restartBtn = document.getElementById('restart-btn');
            this.startBtn = document.getElementById('start-btn');
            this.playerChoice = document.getElementsByName('player');
        
            this.startBtn.addEventListener('click', () => this.startGame());
        }
        
        startGame() {
            let player = Array.from(this.playerChoice).find(radio => radio.checked)?.value || 1;
            this.game = new TicTacToeGame(parseInt(player));
            this.cpuPlayer = new CPUPlayer();
            this.initializeBoard();
            if (this.game.getCurrentPlayer() === 1) {
                this.updateMessage("コンピューターの番です。");
                this.makeCPUMove();
            } else {
                this.updateMessage("あなたの番です。");
            }
        }
        
        initializeBoard() {
            this.board.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.addEventListener('click', () => this.makeMove(i));
                this.board.appendChild(cell);
            }
            this.updateMessage("コンピューターの番です。");
            this.makeCPUMove();
        }

        makeMove(index) {
            if (this.game.makeMove(index)) {
                this.updateBoard();
                this.checkGameStatus();
            }
        }

        makeCPUMove() {
            setTimeout(() => {
                let move = this.cpuPlayer.getBestMove(this.game.getCurrentState());
                this.makeMove(move);
            }, 500);
        }

        updateBoard() {
            let cells = this.board.getElementsByClassName('cell');
            let state = this.game.getCurrentState();
            for (let i = 0; i < 9; i++) {
                cells[i].textContent = state[i] === 1 ? 'X' : state[i] === -1 ? 'O' : '';
            }
        }

        updateMessage(msg) {
            this.message.textContent = msg;
        }

        checkGameStatus() {
            if (this.game.checkWinner()) {
                this.updateMessage(this.game.getCurrentPlayer() === -1 ? "あなたの勝ち!" : "コンピューターの勝ち!");
            } else if (this.game.isBoardFull()) {
                this.updateMessage("引き分けです!");
            } else {
                this.game.switchPlayer();
                if (this.game.getCurrentPlayer() === 1) {
                    this.updateMessage("コンピューターの番です。");
                    this.makeCPUMove();
                } else {
                    this.updateMessage("あなたの番です。");
                }
            }
        }

        restartGame() {
            this.game.restartGame();
            this.initializeBoard();
        }
    }

    new TicTacToeUI();
});
