const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const snowflakes = [];
function createSnowflakes() {
    const numFlakes = 100;
    for (let i = 0; i < numFlakes; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            opacity: Math.random(),
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 3 + 1,
            radius: Math.random() * 4 + 1,
        });
    }
}
createSnowflakes();

function drawSnowflakes() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    snowflakes.forEach(snowflake => {
        ctx.moveTo(snowflake.x, snowflake.y);
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, true);
    });
    ctx.fill();
    updateSnowflakes();
}

function updateSnowflakes() {
    snowflakes.forEach(snowflake => {
        snowflake.x += snowflake.speedX;
        snowflake.y += snowflake.speedY;
        if (snowflake.y > height) {
            snowflake.y = 0;
        }
        if (snowflake.x > width) {
            snowflake.x = 0;
        }
        if (snowflake.x < 0) {
            snowflake.x = width;
        }
    });
}

function animateSnowflakes() {
    drawSnowflakes();
    requestAnimationFrame(animateSnowflakes);
}
animateSnowflakes();