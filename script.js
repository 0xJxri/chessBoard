import { Chessboard, FEN } from "./node_modules/cm-chessboard/src/Chessboard.js"
import { Chess } from "https://cdn.jsdelivr.net/npm/chess.mjs@1/src/chess.mjs/Chess.js"


const board = new Chessboard(document.getElementById("board"), {
    position: FEN.start,
    assetsUrl: "./node_modules/cm-chessboard/assets/"
})

function movesToFen(moves) {
    const chess = new Chess();
    const fenList = [];

    for (let i = 0; i < moves.length; i += 2) {
        const moveNumber = Math.floor(i / 2) + 1;
        const whiteMove = moves[i];
        const blackMove = moves[i + 1];

        chess.move(whiteMove);
        fenList.push({ moveNumber, fen: chess.fen() });

        chess.move(blackMove);
        fenList.push({ moveNumber, fen: chess.fen() });
    }

    return fenList;
}

// Example usage:
let moves = [
    'd4',
    'g6',
    'Bf4',
    'Bg7',
    'e3',
    'Nf6',
    'Bc4',
    'O-O',
    'h4',
    'b6',
    'g4',
    'c6',
    'g5',
    'd6',
    'h5',
    'e6',
    'gxf6',
    'e5',
    'hxg6',
    'Na6',
    'fxg7',
    'b5',
    'Rxh7',
    'c5',
    'Qh5',
    'b4',
    'Rh8+',
    'Kxg7',
];

let fenMoves = movesToFen(moves);

// Keep track of the current move index
let currentMoveIndex = 0;

// Function to update board position based on move index
function updateBoardPosition() {
    const fen = fenMoves[currentMoveIndex].fen;
    board.setPosition(fen);
}

// Event listener for the previous move button
document.getElementById("prevMove").addEventListener("click", () => {
    if (currentMoveIndex > 0) {
        currentMoveIndex--;
        updateBoardPosition();
    }
});

// Event listener for the next move button
document.getElementById("nextMove").addEventListener("click", () => {
    if (currentMoveIndex < fenMoves.length - 1) {
        currentMoveIndex++;
        updateBoardPosition();
    }
});