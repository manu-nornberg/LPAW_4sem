const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function quad(ctx, x, y, s, l, color, fill = false) {
    ctx.lineWidth = 6;
    ctx.strokeStyle = color
    ctx.strokeRect(x, y, s, l)
    if (fill) {
        ctx.fillStyle = fill
        ctx.fillRect(x, y, s, l);
    }
}


function circ(ctx, x, y, r, l, color, fill = false) {
    ctx.lineWidth = l;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.stroke();
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }

}

function triEqui(ctx, x, y, l, color = '#f00', rev = false) {
    ctx.lineWidth = 5;
    ctx.fillStyle = color;
    ctx.beginPath();
    if (rev) {
        ctx.moveTo(x - 50, y);
        ctx.lineTo(x + 50, y);
        ctx.lineTo(x - 3, y + 80);
        ctx.fill();
    } else {
        ctx.moveTo(x, y);
        ctx.lineTo(x + 50, y + 80);
        ctx.lineTo(x - 50, y + 80);
        ctx.fill();
    }

}

function drawStar(ctx, x, y, s, color) {
    // ctx.lineWidth = 5;
    // ctx.fillStyle = color;
    // ctx.beginPath();

    // ctx.moveTo(x - 50, y);
    // ctx.lineTo(x + 50, y);
    // ctx.lineTo(x - 3, y + 80);
    // ctx.fill();

    // ctx.moveTo(x, y);
    // ctx.lineTo(x + 50, y + 80);
    // ctx.lineTo(x - 50, y + 80);
    // ctx.fill();

    // ctx.moveTo(x, y - 30);
    // ctx.lineTo(x - 30, y + 10);
    // ctx.lineTo(x + 30, y + 10);
    // ctx.fill();

    // ctx.moveTo(x, y + 110);
    // ctx.lineTo(x - 20, y + 80);
    // ctx.lineTo(x + 20, y + 80);
    // ctx.fill();

    triEqui(ctx, x, y, s, color, true);
    triEqui(ctx, x, y - s / 1.5, s, color, false)
}


function shield(ctx, x, y, size) {
    circ(ctx, x, y, size, 1, 'red', "red");
    circ(ctx, x, y, size * .8, 1, 'white', "white");
    circ(ctx, x, y, size * .7, 1, 'red', "red");
    circ(ctx, x, y, size * .6, 1, 'blue', "blue");
    drawStar(ctx, x, y - 25, size * .4, 'white');
}

function smile(ctx, x, y, size) {
    circ(ctx, x, y, size, 1, 'black', "yellow");
    circ(ctx, x - 20, y - 10, size * .1, 1, 'black', "black");
    circ(ctx, x + 20, y - 10, size * .1, 1, 'black', "black");

    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(x, y + 10, size * .5, 0, Math.PI);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
}

function writeCenter(ctx, cwidth, cheight, text, color = 'black',
    size = 12, family = "serif", style = "normal",
    base = "alphabetic") {
    ctx.textSize = size;
    ctx.font = `${style} ${size}px ${family}`
    ctx.font = family;
    ctx.textBaseline = base;
    ctx.text = text;
    let textMetric = ctx.measureText(text)
    ctx.fillStyle = color;
    ctx.fillText(text, cwidth / 2 - textMetric.width / 2,
        cheight / 2 - size);

}

function gradiente(ctx, cwidth, cheight, text, color = 'black',
    size = 12, family = "serif", style = "normal",
    base = "alphabetic") {

    let gradiente = ctx.createLinearGradient(0, 0,
        canvas.width, canvas.height)
    gradiente.addColorStop(0, "#000")
    gradiente.addColorStop(.5, "#f0f")
    gradiente.addColorStop(1, "#000")
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    writeCenter(ctx, cwidth, cheight, text,
        color, size, family, style, base);

    let textSize = size;
    let texto = text;
    let textMetric = ctx.measureText(texto)

    let x0 = cwidth / 2 - textMetric.width / 2;
    let y0 = cheight / 2 - textSize;
    let x1 = cwidth / 2 + textMetric.width / 2;
    let y1 = y0;
    let gra = ctx.createLinearGradient(x0, y0, x1, y1);

    gra.addColorStop(0, "#f0f")
    gra.addColorStop(.5, "#fff")
    gra.addColorStop(1, "#f0f")
    ctx.fillStyle = gra;
    ctx.fillText(texto,
        canvas.width / 2 - textMetric.width / 2,
        canvas.height / 2 - textSize)
}





