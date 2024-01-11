const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const coinsCollectedDisplay = document.getElementById('coins-collected');
const movesLeftDisplay = document.getElementById('moves-left');
const highScoreDisplay = document.getElementById('high-score');
const numRows = 3;
const numCols = 3;
const cellSize = 100;
const totalMoves = 10;

let playerPos = { row: 1, col: 1 };
let playerPosAnimated = { row: 1, col: 1 };
let coinsCollected = 0;
let movesLeft = totalMoves;
let highScore = 0;
let coins = [];

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function drawRoundedRect(x, y, width, height, borderRadius) {
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + width - borderRadius, y);
    ctx.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.arcTo(x + width, y + height, x + width - borderRadius, y + height, borderRadius);
    ctx.lineTo(x + borderRadius, y + height);
    ctx.arcTo(x, y + height, x, y + height - borderRadius, borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.arcTo(x, y, x + borderRadius, y, borderRadius);
    ctx.closePath();
}

function drawGrid() {
    ctx.fillStyle = '#303030';
    drawRoundedRect(0, 0, canvas.width, canvas.height, 10);
    ctx.fill();

    ctx.strokeStyle = '#00b3b3';
    ctx.lineWidth = 2;

    for (let i = 1; i < numRows; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }

    for (let i = 1; i < numCols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
    }
}


function drawPlayer() {
    ctx.fillStyle = '#00b3b3';
    ctx.font = 'bold 48px monospace';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('@', playerPos.col * cellSize + cellSize / 2, playerPos.row * cellSize + cellSize / 2);
}

function drawCoins() {
    ctx.fillStyle = 'gold';
    coins.forEach((coin) => {
        ctx.beginPath();
        ctx.arc(
            coin.col * cellSize + cellSize / 2,
            coin.row * cellSize + cellSize / 2,
            cellSize / 8,
            0,
            2 * Math.PI
        );
        ctx.fill();
    });
}


function spawnCoin() {
    if (movesLeft > 0) {
        const row = Math.floor(Math.random() * numRows);
        const col = Math.floor(Math.random() * numCols);

        if (!coins.some((coin) => coin.row === row && coin.col === col) && !(playerPos.row === row && playerPos.col === col)) {
            coins.push({ row, col });
        }

        setTimeout(spawnCoin, Math.random() * 2000 + 1000);
    }
}

function movePlayer(row, col) {
    if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
        const startPos = { row: playerPos.row, col: playerPos.col };
        playerPos.row = row;
        playerPos.col = col;

        let t = 0;
        function animate() {
            t += 0.05;
            if (t > 1) t = 1;

            playerPosAnimated.row = lerp(startPos.row, playerPos.row, t);
            playerPosAnimated.col = lerp(startPos.col, playerPos.col, t);

            draw();

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                const coinIndex = coins.findIndex((coin) => coin.row === row && coin.col === col);
                if (coinIndex !== -1) {
                    coins.splice(coinIndex, 1);
                    coinsCollected++;
                    coinsCollectedDisplay.textContent = coinsCollected;
                }

                movesLeft--;
                movesLeftDisplay.textContent = movesLeft;
                if (movesLeft === 0) {
                    gameOver();
                }
            }
        }
        requestAnimationFrame(animate);
    }
}


function handleKeydown(event) {
    if (movesLeft > 0) {
        switch (event.key) {
            case 'ArrowUp':
                movePlayer(playerPos.row - 1, playerPos.col);
                break;
            case 'ArrowDown':
                movePlayer(playerPos.row + 1, playerPos.col);
                break;
            case 'ArrowLeft':
                movePlayer(playerPos.row, playerPos.col - 1);
                break;
            case 'ArrowRight':
                movePlayer(playerPos.row, playerPos.col + 1);
                break;
            default:
                break;
        }
        draw();
    }
}

function gameOver() {
    if (coinsCollected > highScore) {
        highScore = coinsCollected;
        highScoreDisplay.textContent = highScore;
    }
    alert(`Game Over! You collected ${coinsCollected} coins.`);
    window.location.reload();
}

function draw() {
    drawGrid();
    drawPlayer();
    drawCoins();
}

draw();
spawnCoin();

document.addEventListener('keydown', handleKeydown);
window.addEventListener('beforeunload', gameOver);
