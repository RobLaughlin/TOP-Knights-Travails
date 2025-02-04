import { Queue } from "./Queue.js";

function hashChessSquare(square) {
    // Assumes square is in [row, col] where there are at most 8 rows and columns.
    return square[0] * 8 + square[1];
}

function validChessSquare(square) {
    return square[0] >= 0 && square[0] < 8 && square[1] >= 0 && square[1] < 8;
}

function possibleKnightMoves(square) {
    const [row, col] = square;
    const possibleMoves = [];

    for (let r = 1; r <= 2; r++) {
        const r1 = row + r;
        const r2 = row - r;
        const c1 = col - (3 - r);
        const c2 = col + (3 - r);
        possibleMoves.push([r1, c1], [r1, c2], [r2, c1], [r2, c2]);
    }

    return possibleMoves.filter(validChessSquare);
}

function formatChessSquare(square) {
    const [row, col] = square;
    const char = String.fromCharCode("a".charCodeAt(0) + col);
    return char + (row + 1).toString();
}

function knightMoves(startSquare, endSquare) {
    // Returns the shortest possible path from one square on a chessboard to another.

    if (!validChessSquare(startSquare) || !validChessSquare(endSquare)) {
        throw new RangeError(
            "Invalid start or end chess square. Squares must be contained within an 8x8 grid."
        );
    }

    const [eRow, eCol] = endSquare;

    // Use BFS to find the shortest path
    const q = new Queue();
    q.enqueue([startSquare]);
    const visited = new Set();
    while (q.size() > 0) {
        const path = q.dequeue();
        const lastSquare = path[path.length - 1];

        // Mark square as visited
        visited.add(hashChessSquare(lastSquare));

        // If we reached our target square
        if (lastSquare[0] === eRow && lastSquare[1] === eCol) {
            return path;
        }

        // Otherwise, Keep searching
        possibleKnightMoves(lastSquare).forEach((move) => {
            const hash = hashChessSquare(move);
            const newPath = Array.from(path);
            if (!visited.has(hash)) {
                newPath.push(move);
                q.enqueue(newPath);
            }
        });
    }

    return null;
}

function main() {
    const TEST_PATHS = [
        [
            [0, 0],
            [1, 2],
        ],
        [
            [0, 0],
            [3, 3],
        ],
        [
            [3, 3],
            [0, 0],
        ],
        [
            [0, 0],
            [7, 7],
        ],
        [
            [4, 4],
            [7, 0],
        ],
        [
            [6, 1],
            [1, 5],
        ],
    ];

    TEST_PATHS.forEach((squares) => {
        const [start, end] = squares;
        const path = knightMoves(start, end);
        console.log(`Starting at ${start}\nEnding at ${end}`);

        const pathStr = path.map(formatChessSquare);
        console.log(pathStr.join("->"));
        console.log();
    });
}

main();
